import { EquipmentType } from '@/src/store/equipments'
import { ServiceType } from '@/src/types/Service'
import { User } from '@/src/types/User'

export default interface IDataBaseRepository {
  retriveServices: (user: string) => ServiceType[]
  retrieveReceivedData: (user: string, path: string) => unknown
  retrieveEquipments: (user: string) => EquipmentType[]
  retrieveLastUser: () => User | null
  retriveUsers: () => User[] | null
  retrieveActiveToken: () => string | null

  storeServices: (services: ServiceType[]) => void
  storeReceivedData: (path: string, data: object) => void
  storeUser: (user: User) => void
  storeToken: (token: string) => void

  checkNeedToUpdate: () => boolean
  setNeedToUpdate: (arg: boolean) => void
}
