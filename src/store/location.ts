import { LocationObject } from 'expo-location'
import { create } from 'zustand'

interface LocationStore {
  currentLocation: LocationObject | null

  updateCurrentLocation: (arg: LocationObject) => void
}

export const useLocationStore = create<LocationStore>((set) => {
  return {
    currentLocation: null,

    updateCurrentLocation: (location) => {
      set({ currentLocation: location })
    },
  }
})
