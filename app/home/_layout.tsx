import { Header } from '@/src/components/Header'
import db from '@/src/libs/database'
import { useConnection } from '@/src/store/connection'
import { useServices } from '@/src/store/services'
import { Stack } from 'expo-router'
import { useEffect, useState } from 'react'

export default function LayoutHome() {
  const { isConnected } = useConnection()
  const { fetchServices, syncServices } = useServices()

  const [needToUpdate, setNeedToUpdate] = useState(true)

  async function requestData() {
    return new Promise<void>((resolve, reject) => {
      Promise.all([fetchServices('dev_03')])
        .then(() => resolve())
        .catch((err) => reject(err))
    })
  }

  useEffect(() => {
    if (isConnected && needToUpdate) {
      requestData()
        .then(() => syncServices('dev_03'))
        .then(() => {
          console.log('Synced')
          db.setNeedToUpdate(false)
        })
        .catch((err) => console.log(err))
    }
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setNeedToUpdate(db.checkNeedToUpdate())
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  return <Stack screenOptions={{ header: Header }} />
}
