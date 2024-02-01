import { EquipmentType } from '@/src/store/equipments'
import { ServiceType } from '@/src/types/Service'

export default interface IDataBaseRepository {
  retriveServices: (user: string) => ServiceType[]
  retrieveReceivedData: (user: string, path: string) => unknown
  retrieveEquipments: (user: string) => EquipmentType[]
  retrieveLastUser: () => { login: string }

  storeServices: (services: ServiceType[]) => void
  storeReceivedData: (path: string, data: object) => void

  checkNeedToUpdate: () => boolean
  setNeedToUpdate: (arg: boolean) => void
}
