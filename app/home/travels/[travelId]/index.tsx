import { SheetModal } from '@/src/components/SheetModal'
import { Subtitle, Title } from '@/src/components/Typography'
import { useLocationStore } from '@/src/store/location'
import { useServices } from '@/src/store/services'
import { TravelType } from '@/src/types/Travel'
import { calculateDistance } from '@/src/utils/calculateDistance'
import { useLocalSearchParams } from 'expo-router'
import { ChevronRight, Truck } from 'lucide-react-native'
import { useEffect, useState } from 'react'
import { Button, Text, View } from 'tamagui'

export default function TravelScreen() {
  const { travelId } = useLocalSearchParams()
  const { services } = useServices()
  const { currentLocation } = useLocationStore()
  const [selectedTravel, setSelectedTravel] = useState<TravelType | null>(null)
  const [equipmentsOpen, setEquipmentsOpen] = useState(false)

  useEffect(() => {
    const allTravels: TravelType[] = []
    if (services) {
      services.forEach((item) => allTravels.push(...item.travels))
      const found = allTravels.find((item) => item.id === Number(travelId))
      if (found) {
        setSelectedTravel(found)
      }
    }
  }, [services, travelId])

  if (!selectedTravel || !currentLocation) {
    return <Text>Carregando...</Text>
  }

  console.log(JSON.stringify(selectedTravel, null, 2))
  return (
    <View f={1} bg="$white">
      <View height="60%" width="100%" bg="$green200"></View>
      <View f={1} px="$4" py="$6" gap="$6">
        <View w="100%" flexDirection="row" jc="space-between">
          <View gap="$1">
            <Title>{selectedTravel.destination.description}</Title>
            <Subtitle fontSize="$2" color="$zinc500">
              Viagem de{' '}
              {selectedTravel.origin?.description === 'origin'
                ? 'ida'
                : 'volta'}
            </Subtitle>
          </View>
          <View
            gap="$0.5"
            h="$5"
            w="$5"
            bg="$purple600"
            jc="center"
            ai="center"
            borderRadius="$2"
          >
            <Text fontSize="$2" color="$white">
              {calculateDistance(
                currentLocation.coords,
                selectedTravel.destination,
              ).toFixed(0)}
            </Text>
            <Text fontSize="$1" color="$white">
              km
            </Text>
          </View>
        </View>
        <View w="100%" h="$0.25" bg="$zinc200"></View>
        <View w="100%" flexDirection="row" jc="space-between" ai="center">
          <View flexDirection="row" gap="$2" ai="center">
            <Truck size={32} color="#1E293B" />
            <Text color="$zinc700">Visualizar Equipamentos</Text>
          </View>
          <Button
            bg="$purple200"
            h="$5"
            w="$5"
            jc="center"
            ai="center"
            borderRadius="$2"
            onPress={() => setEquipmentsOpen(true)}
          >
            <ChevronRight color="#6D28D9" />
          </Button>
        </View>
        <Button w="100%" bg="$purple600" color="$white">
          Iniciar Viagem
        </Button>
      </View>
      <SheetModal
        dismissOnSnapToBottom
        dismissOnOverlayPress
        open={equipmentsOpen}
        onOpenChange={setEquipmentsOpen}
        modal
      >
        <SheetModal.Overlay />
        <SheetModal.Handle />

        <SheetModal.Frame>
          <Text>Equipamentos</Text>
        </SheetModal.Frame>
      </SheetModal>
    </View>
  )
}
