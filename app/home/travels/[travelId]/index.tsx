import { SheetModal } from '@/src/components/SheetModal'
import { Subtitle, Title } from '@/src/components/Typography'
import { useLocationStore } from '@/src/store/location'
import { useServices } from '@/src/store/services'
import { ServiceType } from '@/src/types/Service'
import { TravelType } from '@/src/types/Travel'
import { calculateDistance } from '@/src/utils/calculateDistance'
import { router, useLocalSearchParams } from 'expo-router'
import { ChevronRight, Pause, Truck } from 'lucide-react-native'
import { useEffect, useState } from 'react'
import { Button, Text, View } from 'tamagui'

export default function TravelScreen() {
  const { travelId } = useLocalSearchParams()
  const { services, resumeTravel, pauseTravel, cancelTravel } = useServices()
  const { currentLocation } = useLocationStore()
  const [selectedTravel, setSelectedTravel] = useState<TravelType | null>(null)
  const [parentService, setParentService] = useState<ServiceType | null>(null)
  const [equipmentsOpen, setEquipmentsOpen] = useState(false)

  function handleInitTravel() {
    if (!selectedTravel || !currentLocation) return

    resumeTravel(
      selectedTravel.id,
      selectedTravel.serviceId,
      currentLocation.coords,
    )
  }

  function handlePauseTravel() {
    if (!selectedTravel || !currentLocation) return

    pauseTravel(
      selectedTravel.id,
      selectedTravel.serviceId,
      currentLocation.coords,
    )
  }

  useEffect(() => {
    const allTravels: TravelType[] = []
    if (services) {
      services.forEach((item) => allTravels.push(...item.travels))
      const found = allTravels.find((item) => item.id === Number(travelId))
      if (found) {
        setSelectedTravel(found)
        setParentService(
          services.find((item) => item.id === found.serviceId) || null,
        )
      }
    }
  }, [services, travelId])

  if (!selectedTravel || !currentLocation || !parentService) {
    return <Text>Carregando...</Text>
  }

  return (
    <View f={1} bg="$white">
      <View height="60%" width="100%" bg="$green200"></View>
      <View f={1} px="$4" py="$6" gap="$5">
        <View w="100%" flexDirection="row" jc="space-between">
          <View gap="$1">
            <Title>{selectedTravel.destination.description}</Title>
            <Subtitle fontSize="$2" color="$zinc500">
              Viagem de{' '}
              {selectedTravel.destination.description ===
              parentService.destination.description
                ? 'ida'
                : 'volta'}
            </Subtitle>
          </View>
          {selectedTravel.status === 'progress' ? (
            <View>
              <Text color="$slate500" fontSize="$1">
                {calculateDistance(
                  currentLocation.coords,
                  selectedTravel.destination,
                ).toFixed(0)}
                km restantes
              </Text>
            </View>
          ) : (
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
          )}
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
        {selectedTravel.status === 'progress' ? (
          <View flexDirection="row" ai="flex-end" jc="space-between">
            <Button bg="$red500" color="$white" borderRadius={99}>
              Cancelar viagem
            </Button>
            <Button
              bg="$purple500"
              borderRadius={99}
              px="$4"
              py="$6"
              onPress={handlePauseTravel}
            >
              <Pause color="white" />
            </Button>
            <Button
              bg="$purple500"
              color="$white"
              borderRadius={99}
              onPress={() =>
                router.push(`/home/travels/${selectedTravel.id}/checklist`)
              }
            >
              Finalizar viagem
            </Button>
          </View>
        ) : (
          <Button
            w="100%"
            bg="$purple600"
            color="$white"
            onPress={handleInitTravel}
          >
            Iniciar Viagem
          </Button>
        )}
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
