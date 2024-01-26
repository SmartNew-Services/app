export type EquipmentType = {
  id: number
  code: string
  description: string
  hasPeriod: boolean
  hasMileage: boolean
  hasHourMeter: boolean
  hasAction: boolean
  costCenter: number
  clientId: number
  branchId: number
  mileage: number
  familyId: number
  hourMeter: number
  syncStatus: 'synced' | 'updated'
}
