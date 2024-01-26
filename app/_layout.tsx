import tamaguiConfig from '@/tamagui.config'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import { TamaguiProvider } from 'tamagui'

export { ErrorBoundary } from 'expo-router'

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded] = useFonts({
    Inter: require('../assets/fonts/Inter/static/Inter-Regular.ttf'),
    InterSemibold: require('../assets/fonts/Inter/static/Inter-SemiBold.ttf'),
    InterBold: require('../assets/fonts/Inter/static/Inter-Bold.ttf'),
  })

  useEffect(() => {
    if (loaded) {
      // can hide splash screen here
    }
  }, [loaded])

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
