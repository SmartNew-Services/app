import { Dot } from 'lucide-react-native'
import { XStack, YStack } from 'tamagui'
import { SmallText, Subtitle, Text, Title } from '../Typography'
import { ContainerCard } from './styles'

interface TravelCard {
  date: Date
  title: string
  description: string
  distance?: number
  status: 'progress' | 'canceled' | 'finished' | 'paused'
}

const statuses = {
  paused: 'Pausado',
  progress: 'Em progresso',
  canceled: 'Cancelado',
  finished: 'Finalizado',
}

export function TravelCard({
  date,
  title,
  description,
  distance,
  status,
}: TravelCard) {
  return (
    <ContainerCard gap="$5" padding="$5">
      <YStack ai="center">
        <Subtitle
          color="$purple600"
          textTransform="uppercase"
          // fontWeight="bold"
        >
          {date.toLocaleDateString('pt-BR', {
            weekday: 'short',
          })}
        </Subtitle>
        <Title color="$slate700">
          {date.getDate().toFixed().padStart(2, '0')}
        </Title>
      </YStack>
      <YStack f={1}>
        <Text textTransform="uppercase" fontSize="$2">
          {title}
        </Text>
        <XStack ai="center">
          {distance && (
            <>
              <SmallText>{distance.toFixed(0) + 'km'}</SmallText>
              <Dot color="#71717a" />
            </>
          )}
          <SmallText textTransform="uppercase">{description}</SmallText>
        </XStack>
        <SmallText
          marginLeft="auto"
          bg="$purple200"
          px="$3"
          py="$2"
          br={999}
          color="$purple600"
        >
          {statuses[status]}
        </SmallText>
      </YStack>
    </ContainerCard>
  )
}
