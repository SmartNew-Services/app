import { EquipmentType } from '@/src/store/equipments'
import { ServiceType } from '@/src/store/services'

export default interface IDataBaseRepository {
  retriveServices: (user: string) => ServiceType[]
  storeServices: (services: ServiceType[]) => void

  retrieveEquipments: (user: string) => EquipmentType[]

  retrieveLastUser: () => { login: string }

  checkNeedToUpdate: () => boolean
  setNeedToUpdate: (arg: boolean) => void
}
