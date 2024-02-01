import { EquipmentType } from '@/src/store/equipments'
import { ServiceType } from '@/src/types/Service'
import IDataBaseRepository from './IDataBaseRepository'
import IDataBaseService from './IDataBaseService'

export default class DataBaseRepository implements IDataBaseRepository {
  // eslint-disable-next-line no-useless-constructor
  constructor(private mmkv: IDataBaseService) {}

  retriveServices(user: string) {
    const storedServices = this.mmkv.getString(`${user}/services`)
    if (storedServices) {
      const services: ServiceType[] = JSON.parse(storedServices)
      return services
    } else {
      throw new Error('Não foi possível carregar os atendimentos')
    }
  }

  retrieveReceivedData(user: string, path: string) {
    const stored = this.mmkv.getString(user + path)
    if (stored) {
      const data = JSON.parse(stored)
      return data
    } else {
      throw new Error(
        'Não foi possível carregar as informações salvas de ' + path,
      )
    }
  }

  storeServices(services: ServiceType[]) {
    const user = this.retrieveLastUser()
    this.mmkv.set(`${user.login}/services`, JSON.stringify(services))
  }

  storeReceivedData(path: string, data: object) {
    this.mmkv.set(path, JSON.stringify(data))
  }

  retrieveEquipments(user: string) {
    const storedEquipments = this.mmkv.getString(`${user}/equipments`)
    if (storedEquipments) {
      const equipments: EquipmentType[] = JSON.parse(storedEquipments)
      return equipments
    } else {
      throw new Error('Não foi possível carregar os atendimentos')
    }
  }

  retrieveLastUser() {
    const storedUserString = this.mmkv.getString('lastUser')
    if (storedUserString) {
      const storedUser: { login: string } = JSON.parse(storedUserString)
      return storedUser
    } else {
      throw new Error('Não foi possível carregar o usuário logado')
    }
  }

  checkNeedToUpdate() {
    const needToUpdate = this.mmkv.getBoolean('needToUpdate')
    if (needToUpdate === undefined) {
      this.setNeedToUpdate(false)
      return false
    } else {
      return needToUpdate
    }
  }

  setNeedToUpdate(arg: boolean) {
    this.mmkv.set('needToUpdate', arg)
  }
}
