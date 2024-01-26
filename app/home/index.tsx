import { MonthToggle } from '@/src/components/MonthToggle'
import { TravelCard } from '@/src/components/TravelCard'
import { Text, Title } from '@/src/components/Typography'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ToggleGroup, View } from 'tamagui'

export default function HomeScreen() {
  return (
    <View f={1}>
      <SafeAreaView style={{ flex: 1 }}>
        <View f={1} bg="$background" p="$6" gap="$4">
          <Title>Inicio</Title>
          <MonthToggle />
          <TravelCard
            title="Uberlandia - MG"
            date={new Date()}
            description="caminhao munk"
            status="fim"
          />
        </View>
      </SafeAreaView>
    </View>
  )
}
