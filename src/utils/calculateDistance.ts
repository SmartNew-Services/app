import { LocationType } from '../types'

export function calculateDistance(posX: LocationType, posY: LocationType) {
  const latX = posX.latitude
  const longX = posX.longitude
  const latY = posY.latitude
  const longY = posY.longitude

  const distanceConstant = 111.11

  function sqrt(value: number) {
    return value ** 0.5
  }

  const distance =
    sqrt((latY - latX) ** 2 + (longY - longX) ** 2) * distanceConstant

  return distance
}
