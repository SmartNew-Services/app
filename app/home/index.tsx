import { MonthToggle } from '@/src/components/MonthToggle'
import { ServiceCard } from '@/src/components/ServiceCard'
import { Title } from '@/src/components/Typography'
import { useServices } from '@/src/store/services'
import { router } from 'expo-router'
import { useState } from 'react'
import { FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View } from 'tamagui'

export default function HomeScreen() {
  const { services } = useServices()
  const [currentMonth, setCurrentMonth] = useState<string>('janeiro')

  function handleChangeMonth(value: string) {
    setCurrentMonth(value)
  }

  console.log(JSON.stringify(services, null, 2))

  return (
    <View f={1} bg="$background">
      <SafeAreaView style={{ flex: 1 }}>
        <View f={1} py="$2" px="$4" gap="$4">
          <Title>Inicio</Title>
          <MonthToggle value={currentMonth} onValueChange={handleChangeMonth} />
          <FlatList
            style={{ flex: 1 }}
            data={services}
            extraData={services}
            renderItem={({ item }) => (
              <ServiceCard
                title={item.destination.description}
                date={new Date(item.dueDate)}
                description={''}
                status={item.status}
                distance={'100km'}
                onPress={() => router.push(`/home/${item.id}`)}
              />
            )}
          />
        </View>
      </SafeAreaView>
    </View>
  )
}
