import { SheetModal } from '@/src/components/SheetModal'
import { Tabs } from '@/src/components/Tabs'
import { TravelCard } from '@/src/components/TravelCard'
import { Title } from '@/src/components/Typography'
import { useServices } from '@/src/store/services'
import { ServiceType } from '@/src/types/Service'
import { TravelType } from '@/src/types/Travel'
import { useLocalSearchParams } from 'expo-router'
import { CheckCheck, Info, Plus, XCircle } from 'lucide-react-native'
import { useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, Sheet, SizableText, Text, View } from 'tamagui'

export default function ServiceScreen() {
  const { serviceId } = useLocalSearchParams()
  const { services } = useServices()
  const [selectedService, setSelectedService] = useState<ServiceType | null>(
    null,
  )
  const [travels, setTravels] = useState<TravelType[] | null>(null)
  const [activeTab, setActiveTab] = useState('travels')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const found = services?.find((item) => item.id === Number(serviceId))
    if (found) {
      setSelectedService(found)
      setTravels(found.travels)
    }
  }, [serviceId, services])

  function handleSelectTab(tab: string) {
    setActiveTab(tab)
    console.log(activeTab)
  }

  if (!serviceId || !services || !selectedService) {
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
          <Title>{selectedService.destination}</Title>
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
                    renderItem={({ item }) => (
                      <TravelCard
                        title={selectedService.destination}
                        date={new Date(item.startDate)}
                        description={''}
                        status={item.status}
                        distance={'100km'}
                        // onPress={() => router.push(`/home/${item.id}`)}
                      />
                    )}
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
          <Text>Test</Text>
        </SheetModal.Frame>
      </SheetModal>
    </View>
  )
}
