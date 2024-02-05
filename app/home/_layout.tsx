import { Header } from '@/src/components/Header'
import db from '@/src/libs/database'
import { useAuth } from '@/src/store/auth'
import { useConnection } from '@/src/store/connection'
import { useServices } from '@/src/store/services'
import { Stack } from 'expo-router'
import { useEffect, useState } from 'react'

export default function LayoutHome() {
  const { isConnected } = useConnection()
  const { loadServices, fetchServices, syncServices } = useServices()
  const { user, token } = useAuth()

  const [needToUpdate, setNeedToUpdate] = useState(true)

  async function requestData(login: string, token: string) {
    return new Promise<void>((resolve, reject) => {
      Promise.all([fetchServices(login, token)])
        .then(() => resolve())
        .catch((err) => reject(err))
    })
  }

  useEffect(() => {
    if (isConnected && needToUpdate && user && token) {
      console.log(user)
      requestData(user.login, token)
        .then(() => syncServices('dev_03'))
        .then(() => {
          console.log('Synced')
          db.setNeedToUpdate(false)
          loadServices(user.login)
        })
        .catch((err) => console.log(err))
    }
  }, [isConnected, needToUpdate, user, token])

  useEffect(() => {
    const interval = setInterval(() => {
      setNeedToUpdate(db.checkNeedToUpdate())
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  return <Stack screenOptions={{ header: Header }} />
}
