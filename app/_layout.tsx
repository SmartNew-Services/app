import { useConnection } from '@/src/store/connection'
import tamaguiConfig from '@/tamagui.config'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import { TamaguiProvider } from 'tamagui'
export { ErrorBoundary } from 'expo-router'

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const { establishConnection, testConnection } = useConnection()
  const [loaded] = useFonts({
    Inter: require('../assets/fonts/Inter/static/Inter-Regular.ttf'),
    InterSemibold: require('../assets/fonts/Inter/static/Inter-SemiBold.ttf'),
    InterBold: require('../assets/fonts/Inter/static/Inter-Bold.ttf'),
  })

  useEffect(() => {
    dayjs.locale('pt-br')
    if (loaded) {
      // can hide splash screen here
    }
  }, [loaded])

  useEffect(() => {
    establishConnection()
    const interval = setInterval(() => {
      testConnection()
    }, 15000)
    return () => clearInterval(interval)
  }, [])

  if (!loaded) {
    return null
  }

  return <RootLayoutNav />
}

function RootLayoutNav() {
  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme="light">
      <Stack screenOptions={{ headerShown: false }} />
    </TamaguiProvider>
  )
}
