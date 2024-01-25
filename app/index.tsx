import { router } from 'expo-router'
import { Button, View } from 'react-native'

export default function AppIndex() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Entrar" onPress={() => router.push('/home/')} />
    </View>
  )
}
