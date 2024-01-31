import { MonthToggle } from '@/src/components/MonthToggle'
import { TravelCard } from '@/src/components/TravelCard'
import { Title } from '@/src/components/Typography'
import { router } from 'expo-router'
import { useState } from 'react'
import { FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View } from 'tamagui'

const travelsData = [
  {
    title: 'Uberlandia - MG',
    date: new Date(),
    description: 'caminhao munk',
    status: 'fim',
    distance: '455',
  },
]

export default function HomeScreen() {
  const [currentMonth, setCurrentMonth] = useState<string>('janeiro')
  console.log(currentMonth)

  function handleChangeMonth(value: string) {
    setCurrentMonth(value)
  }

  return (
    <View f={1}>
      <SafeAreaView style={{ flex: 1 }}>
        <View f={1} bg="$background" p="$6" gap="$4">
          <Title>Inicio</Title>
          <MonthToggle value={currentMonth} onValueChange={handleChangeMonth} />
          <FlatList
            style={{ flex: 1 }}
            data={travelsData}
            renderItem={({ item }) => (
              <TravelCard
                title={item.title}
                date={item.date}
                description={item.description}
                status={item.status}
                distance={item.distance}
                onPress={() => router.push('/home/[213]')}
              />
            )}
          />
        </View>
      </SafeAreaView>
    </View>
  )
}
