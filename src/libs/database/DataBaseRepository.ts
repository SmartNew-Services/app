import { EquipmentType } from '@/src/store/equipments'
import { ServiceType } from '@/src/store/services'
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

  storeServices(services: ServiceType[]) {
    const user = this.retrieveLastUser()
    this.mmkv.set(`${user.login}/services`, JSON.stringify(services))
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
