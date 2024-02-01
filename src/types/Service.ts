import { LocationType } from './LocationType'
import { TravelType } from './Travel'

export interface ReceivedServiceType {
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
  listedEquipments: {
    equipmentId: number
    answered: boolean
  }[]
}

export interface ServiceType extends ReceivedServiceType {
  travels: TravelType[]
  syncStatus: 'updated' | 'synced'
}
