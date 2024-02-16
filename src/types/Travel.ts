import { DestinationType } from './Destination'
import { LocationType } from './LocationType'

export interface ReceivedTravelType {
  id: number
  serviceId: number
  startDate: Date
  endDate: Date | null
  startLocation: LocationType
  lastLocation: LocationType
  destination: DestinationType
  origin: DestinationType

  status: 'progress' | 'paused' | 'canceled' | 'finished'
  pauses: {
    started: Date
    ended: Date | null
    pausedLocation: LocationType
    resumedLocation: LocationType | null
  }[]
  answeredEquipments: {
    equipmentId: number
    time: Date
  }[]
  distanceTraveled: number
}

export interface TravelType extends ReceivedTravelType {
  syncStatus: 'inserted' | 'updated' | 'synced'
}
