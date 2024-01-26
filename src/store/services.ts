import { create } from 'zustand'
import { db } from '../libs/database'
import LocationType from '../types/LocationType'
import { calculateDistance } from '../utils/calculateDistance'

type TravelType = {
  id: number
  serviceId: number
  startDate: Date
  endDate: Date | null
  startLocation: LocationType
  lastLocation: LocationType

  status: 'progress' | 'paused' | 'canceled' | 'finished'
  pauses: {
    started: Date
    ended: Date | null
    pausedLocation: LocationType
    resumedLocation: LocationType | null
  }[]
  positions: {
    time: Date
    location: LocationType
  }[]
  distanceTraveled: number
  syncStatus: 'inserted' | 'updated' | 'synced'
}

export type ServiceType = {
  id: number
  dueDate: Date
  startDate: null | Date
  endDate: null | Date
  driver: string

  status: 'due' | 'progress' | 'canceled' | 'finished'
  destination: string
  destinationCoords: LocationType
  distanceTraveled: number
  startLocation: LocationType | null
  travels: TravelType[]
  syncStatus: 'updated' | 'synced'
}

interface UseServicesData {
  services: null | ServiceType[]

  loadServices: (user: string) => void
  findService: (serviceId: number) => ServiceType
  updateService: (serviceId: number, service: ServiceType) => void
  startService: (serviceId: number, location: LocationType) => void
  cancelService: (serviceId: number) => void
  finishService: (serviceId: number) => void

  findTravel: (travelId: number, serviceId: number) => TravelType
  updateTravel: (travel: TravelType) => void
  updateTravelLocation: (travel: TravelType, location: LocationType) => void
  createTravel: (serviceId: number, location: LocationType) => void
  pauseTravel: (
    travelId: number,
    serviceId: number,
    location: LocationType,
  ) => void
  resumeTravel: (
    travelId: number,
    serviceId: number,
    location: LocationType,
  ) => void
  cancelTravel: (
    travelId: number,
    serviceId: number,
    location: LocationType,
  ) => void
  finishTravel: (
    travelId: number,
    serviceId: number,
    location: LocationType,
  ) => void
}

export const useServices = create<UseServicesData>((set, get) => {
  return {
    services: null,

    loadServices: (user) => {
      const services = db.retriveServices(user)
      set({ services })
    },

    findService: (serviceId) => {
      const allServices = get().services
      if (!allServices) throw new Error('Atendimentos não carregados')

      const service = allServices.find((item) => item.id === serviceId)
      if (!service) throw new Error('Atendimento não encontrado')

      return service
    },

    updateService: (serviceId, service) => {
      const allServices = get().services
      const newServices: ServiceType[] = []
      if (!allServices) throw new Error('Atendimentos não carregados')

      allServices.forEach((item) => {
        if (item.id === serviceId) {
          service.syncStatus = 'updated'
          newServices.push(service)
        } else {
          newServices.push(item)
        }
      })

      db.storeServices(newServices)
      db.setNeedToUpdate(true)
      set({ services: newServices })
    },

    startService: (serviceId, location) => {
      const service = get().findService(serviceId)
      service.status = 'progress'
      service.startDate = new Date()
      service.startLocation = location

      get().updateService(serviceId, service)
    },

    cancelService: (serviceId) => {
      const service = get().findService(serviceId)
      service.status = 'canceled'

      get().updateService(serviceId, service)
    },

    finishService: (serviceId) => {
      const service = get().findService(serviceId)

      service.status = 'finished'
      service.endDate = new Date()

      get().updateService(serviceId, service)
    },

    findTravel: (travelId, serviceId) => {
      const service = get().findService(serviceId)

      const travel = service.travels.find((item) => item.id === travelId)
      if (!travel) throw new Error('Não foi possível encontrar a viagem')

      return travel
    },

    updateTravel: (travel) => {
      const allServices = get().services
      const newServices: ServiceType[] = []
      if (!allServices) throw new Error('Atendimentos não carregados')

      allServices.forEach((service) => {
        if (service.id === travel.serviceId) {
          const updatedService = { ...service }
          const newTravels: TravelType[] = []
          updatedService.travels.forEach((item) => {
            if (item.id === travel.id) {
              travel.syncStatus = 'updated'
              newTravels.push(travel)
            } else {
              newTravels.push(item)
            }
          })
        } else {
          newServices.push(service)
        }
      })

      const updated = newServices.find((item) => item.id === travel.serviceId)
      if (!updated) return
      get().updateService(travel.serviceId, updated)
    },

    updateTravelLocation: (travel, location) => {
      travel.distanceTraveled += calculateDistance(
        travel.lastLocation,
        location,
      )
      travel.positions.push({
        time: new Date(),
        location,
      })
      travel.lastLocation = location

      get().updateTravel(travel)
    },

    createTravel: (serviceId, location) => {
      const newTravel: TravelType = {
        id: new Date().getTime(),
        serviceId,
        startDate: new Date(),
        endDate: null,
        startLocation: location,
        lastLocation: location,
        pauses: [],
        positions: [
          {
            time: new Date(),
            location,
          },
        ],
        distanceTraveled: 0,
        status: 'progress',
        syncStatus: 'inserted',
      }

      const service = get().findService(serviceId)
      service.travels = [...service.travels, newTravel]

      get().updateService(serviceId, service)
    },

    cancelTravel: (travelId, serviceId, location) => {
      const travel = get().findTravel(travelId, serviceId)

      travel.status = 'canceled'

      get().updateTravelLocation(travel, location)
    },

    pauseTravel: (travelId, serviceId, location) => {
      const travel = get().findTravel(travelId, serviceId)

      travel.status = 'paused'
      travel.pauses.push({
        started: new Date(),
        ended: null,
        pausedLocation: location,
        resumedLocation: null,
      })

      get().updateTravelLocation(travel, location)
    },

    resumeTravel: (travelId, serviceId, location) => {
      const travel = get().findTravel(travelId, serviceId)

      const newPauses: {
        started: Date
        ended: Date | null
        pausedLocation: LocationType
        resumedLocation: LocationType | null
      }[] = []
      travel.pauses.forEach((item) => {
        if (!item.ended) {
          const updatedPause = { ...item }
          updatedPause.ended = new Date()
          updatedPause.resumedLocation = location
          newPauses.push(updatedPause)
        } else {
          newPauses.push(item)
        }
      })
      travel.status = 'progress'
      travel.pauses = newPauses

      get().updateTravelLocation(travel, location)
    },

    finishTravel: (travelId, serviceId, location) => {
      const travel = get().findTravel(travelId, serviceId)

      travel.endDate = new Date()
      travel.status = 'finished'

      get().updateTravelLocation(travel, location)
    },
  }
})
