import { Form } from '@/src/components/Form'
import { SheetModal } from '@/src/components/SheetModal'
import { Tabs } from '@/src/components/Tabs'
import { TravelCard } from '@/src/components/TravelCard'
import { Title } from '@/src/components/Typography'
import { useLocationStore } from '@/src/store/location'
import { useServices } from '@/src/store/services'
import { ServiceType } from '@/src/types/Service'
import { TravelType } from '@/src/types/Travel'
import { calculateDistance } from '@/src/utils/calculateDistance'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from 'expo-location'
import { useLocalSearchParams } from 'expo-router'
import { CheckCheck, Info, Plus, XCircle } from 'lucide-react-native'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, SizableText, Text, View } from 'tamagui'
import { z } from 'zod'

const createTravelSchema = z.object({
  origin: z.string({ required_error: 'Selecione uma origem ' }),
  destination: z.string({ required_error: 'Selecione um destino ' }),
})

type CreateTravelData = z.infer<typeof createTravelSchema>

export default function ServiceScreen() {
  const { serviceId } = useLocalSearchParams()
  const { services, createTravel } = useServices()
  const [selectedService, setSelectedService] = useState<ServiceType | null>(
    null,
  )
  const [travels, setTravels] = useState<TravelType[] | null>(null)
  const [activeTab, setActiveTab] = useState('travels')
  const [open, setOpen] = useState(false)

  const createTravelForm = useForm<CreateTravelData>({
    resolver: zodResolver(createTravelSchema),
  })
  const { handleSubmit } = createTravelForm
  const { currentLocation, updateCurrentLocation } = useLocationStore()

  function handleSelectTab(tab: string) {
    setActiveTab(tab)
    console.log(activeTab)
  }

  function handleCreateTravel(data: CreateTravelData) {
    console.log(data)
    if (!currentLocation || !selectedService) return
    const originPos = {
      latitude:
        data.origin === 'origin'
          ? currentLocation.coords.latitude
          : selectedService.destination.latitude,
      longitude:
        data.origin === 'origin'
          ? currentLocation.coords.longitude
          : selectedService.destination.longitude,
    }
    const destinationPos = {
      latitude:
        data.destination === 'origin'
          ? currentLocation.coords.latitude
          : selectedService.destination.latitude,
      longitude:
        data.destination === 'origin'
          ? currentLocation.coords.longitude
          : selectedService.destination.longitude,
    }

    const created = createTravel({
      serviceId: Number(serviceId),
      destination: {
        description: data.destination,
        ...destinationPos,
      },
      location: {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      },
      origin: {
        description: data.origin,
        ...originPos,
      },
    })

    console.log(created)
  }

  async function requestLocationPermissions() {
    const { granted } = await requestForegroundPermissionsAsync()

    if (granted) {
      const currentPosition = await getCurrentPositionAsync()
      updateCurrentLocation(currentPosition)
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      requestLocationPermissions()
    }, 15000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const found = services?.find((item) => item.id === Number(serviceId))
    if (found) {
      setSelectedService(found)
      setTravels(found.travels)
    }
  }, [serviceId, services])

  if (!serviceId || !services || !selectedService || !currentLocation) {
    return (
      <Text mx="auto" my="auto">
        Carregando
      </Text>
    )
  }

  return (
    <View f={1} bg="$white">
      <SafeAreaView style={{ flex: 1 }}>
        <View f={1} py="$2" px="$4" gap="$4">
          <Title>{selectedService.destination.description}</Title>
          <Tabs.Container defaultValue={activeTab}>
            <Tabs.List>
              <Tabs.Tab
                value="travels"
                active={activeTab === 'travels'}
                onInteraction={() => handleSelectTab('travels')}
              >
                <SizableText fontFamily="$body">Viagens</SizableText>
              </Tabs.Tab>
              <Tabs.Tab
                value="equipments"
                active={activeTab === 'equipments'}
                onInteraction={() => handleSelectTab('equipments')}
              >
                <SizableText fontFamily="$body">Equipamentos</SizableText>
              </Tabs.Tab>
            </Tabs.List>
            <Tabs.Content value="travels">
              <View f={1} gap="$4">
                <View flexDirection="row" jc="space-between" w="100%">
                  <View ai="center">
                    <Button
                      theme="button-light"
                      w="$5"
                      h="$5"
                      borderColor="$slate100"
                      shadowColor="#000000"
                      shadowRadius={2}
                      onPress={() => setOpen(true)}
                    >
                      <Plus color="#334155" />
                    </Button>
                    <Text fontSize="$1">Nova viagem</Text>
                  </View>
                  <View ai="center">
                    <Button
                      theme="button-light"
                      w="$5"
                      h="$5"
                      borderColor="$slate100"
                      shadowColor="#000000"
                      shadowRadius={2}
                    >
                      <XCircle color="#334155" />
                    </Button>
                    <Text fontSize="$1" maxWidth="$7" textAlign="center">
                      Cancelar atendimento
                    </Text>
                  </View>
                  <View ai="center">
                    <Button
                      theme="button-light"
                      w="$5"
                      h="$5"
                      borderColor="$slate100"
                      shadowColor="#000000"
                      shadowRadius={2}
                    >
                      <CheckCheck color="#334155" />
                    </Button>
                    <Text fontSize="$1" maxWidth="$7" textAlign="center">
                      Finalizar Atendimento
                    </Text>
                  </View>
                  <View ai="center">
                    <Button
                      theme="button-light"
                      w="$5"
                      h="$5"
                      borderColor="$slate100"
                      shadowColor="#000000"
                      shadowRadius={2}
                    >
                      <Info color="#334155" />
                    </Button>
                    <Text fontSize="$1" maxWidth="$7" textAlign="center">
                      Informações
                    </Text>
                  </View>
                </View>
                <View f={1}>
                  <FlatList
                    style={{ flex: 1 }}
                    data={travels}
                    extraData={travels}
                    renderItem={({ item }) => {
                      console.log(item)
                      return (
                        <TravelCard
                          title={selectedService.destination.description}
                          date={new Date(item.startDate)}
                          description={''}
                          status={item.status}
                          distance={calculateDistance(
                            currentLocation.coords,
                            item.destination,
                          )}
                          // onPress={() => router.push(`/home/${item.id}`)}
                        />
                      )
                    }}
                  />
                </View>
              </View>
            </Tabs.Content>
            <Tabs.Content value="equipments">
              <Text textAlign="center">Equipamentos</Text>
            </Tabs.Content>
          </Tabs.Container>
        </View>
      </SafeAreaView>

      <SheetModal
        dismissOnSnapToBottom
        dismissOnOverlayPress
        open={open}
        onOpenChange={setOpen}
        modal
      >
        <SheetModal.Overlay />
        <SheetModal.Handle />

        <SheetModal.Frame>
          <FormProvider {...createTravelForm}>
            <View p="$6" gap="$10">
              <Title mx="auto">Nova viagem</Title>
              <View gap="$4">
                <Form.Select
                  id="select"
                  native
                  name="origin"
                  placeholder="Origem"
                  options={[
                    { name: 'Origem', value: 'origin' },
                    { name: 'Los Angeles', value: 'los angeles' },
                  ]}
                />
                <Form.Select
                  id="select"
                  native
                  name="destination"
                  placeholder="Destino"
                  options={[
                    { name: 'Origem', value: 'origin' },
                    { name: 'Los Angeles', value: 'los angeles' },
                  ]}
                />
                <Button
                  w="100%"
                  theme="button-primary"
                  onPress={handleSubmit(handleCreateTravel)}
                >
                  Criar Viagem
                </Button>
              </View>
            </View>
          </FormProvider>
        </SheetModal.Frame>
      </SheetModal>
    </View>
  )
}
