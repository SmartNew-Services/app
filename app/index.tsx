import { router } from 'expo-router'
import { Button, View } from 'tamagui'

export default function AppIndex() {
  return (
    <View flex={1} justifyContent="center" backgroundColor="$purple500">
      <Button onPress={() => router.push('/home/')}>Entrar</Button>
    </View>
  )
}
