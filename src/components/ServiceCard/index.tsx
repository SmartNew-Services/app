import { Dot } from 'lucide-react-native'
import { ComponentProps } from 'react'
import { XStack, YStack } from 'tamagui'
import { SmallText, Subtitle, Text, Title } from '../Typography'
import { ContainerCard } from './styles'

interface ServiceCard extends ComponentProps<typeof ContainerCard> {
  date: Date
  title: string
  description: string
  distance?: string
  status: 'due' | 'progress' | 'canceled' | 'finished'
}

const statuses = {
  due: 'A iniciar',
  progress: 'Em progresso',
  canceled: 'Cancelado',
  finished: 'Finalizado',
}

export function ServiceCard({
  date,
  title,
  description,
  distance,
  status,
  ...props
}: ServiceCard) {
  return (
    <ContainerCard gap="$5" padding="$5" {...props}>
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
              <SmallText>{distance}</SmallText>
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
