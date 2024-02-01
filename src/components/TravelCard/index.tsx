import { Dot } from 'lucide-react-native'
import { ComponentProps } from 'react'
import { XStack, YStack } from 'tamagui'
import { SmallText, Subtitle, Text, Title } from '../Typography'
import { ContainerCard } from './styles'

interface TravelCard extends ComponentProps<typeof ContainerCard> {
  date: Date
  title: string
  description: string
  distance?: string
  status: string
}

export function TravelCard({
  date,
  title,
  description,
  distance,
  status,
  ...props
}: TravelCard) {
  return (
    <ContainerCard gap="$4" {...props}>
      <YStack ai="center">
        <Subtitle
          color="$purple600"
          textTransform="uppercase"
          fontWeight="bold"
        >
          {date.toLocaleDateString('pt-BR', {
            weekday: 'short',
          })}
        </Subtitle>
        <Title color="$slate700">{date.getDay()}</Title>
      </YStack>
      <YStack f={1}>
        <Text textTransform="uppercase" fontWeight="bold">
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
          px="$2"
          py="$1"
          br={999}
          color="$purple600"
          textTransform="uppercase"
          fontWeight="bold"
        >
          {status}
        </SmallText>
      </YStack>
    </ContainerCard>
  )
}
