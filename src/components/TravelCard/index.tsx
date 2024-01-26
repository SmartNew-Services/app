import { XStack } from 'tamagui'
import { ContainerCard } from './styles'
import { ComponentProps } from 'react'
import { SmallText, Subtitle, Text } from '../Typography'

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
      <XStack>
        <Subtitle>
          {date.toLocaleDateString('pt-BR', {
            weekday: 'short',
          })}
        </Subtitle>
        <Subtitle>{date.getDay()}</Subtitle>
      </XStack>
      <XStack f={1}>
        <Text>{title}</Text>
        <SmallText>{description}</SmallText>
        <SmallText>{status}</SmallText>
      </XStack>
    </ContainerCard>
  )
}
