import { EquipmentType } from '@/src/store/equipments'
import { ServiceType } from '@/src/store/services'
import { MMKV } from 'react-native-mmkv'

const mmkv = new MMKV()

interface DbData {
  retriveServices: (user: string) => ServiceType[]
  storeServices: (services: ServiceType[]) => void

  retrieveEquipments: (user: string) => EquipmentType[]

  retrieveLastUser: () => { login: string }

  checkNeedToUpdate: () => boolean
  setNeedToUpdate: (arg: boolean) => void
}

export const db: DbData = {
  retriveServices: (user) => {
    const storedServices = mmkv.getString(`${user}/services`)
    if (storedServices) {
      const services: ServiceType[] = JSON.parse(storedServices)
      return services
    } else {
      throw new Error('Não foi possível carregar os atendimentos')
    }
  },

  storeServices: (services) => {
    const user = db.retrieveLastUser()
    mmkv.set(`${user.login}/services`, JSON.stringify(services))
  },

  retrieveEquipments: (user) => {
    const storedEquipments = mmkv.getString(`${user}/equipments`)
    if (storedEquipments) {
      const equipments: EquipmentType[] = JSON.parse(storedEquipments)
      return equipments
    } else {
      throw new Error('Não foi possível carregar os atendimentos')
    }
  },

  retrieveLastUser: () => {
    const storedUserString = mmkv.getString('lastUser')
    if (storedUserString) {
      const storedUser: { login: string } = JSON.parse(storedUserString)
      return storedUser
    } else {
      throw new Error('Não foi possível carregar o usuário logado')
    }
  },

  checkNeedToUpdate: () => {
    const needToUpdate = mmkv.getBoolean('needToUpdate')
    if (needToUpdate === undefined) {
      db.setNeedToUpdate(false)
      return false
    } else {
      return needToUpdate
    }
  },

  setNeedToUpdate: (arg) => {
    mmkv.set('needToUpdate', arg)
  },
}
