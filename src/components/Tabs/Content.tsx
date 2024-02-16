import { ReactNode } from 'react'
import { Tabs } from 'tamagui'

interface ContentProps {
  children: ReactNode
  value: string
}

export function Content({ children, value }: ContentProps) {
  return (
    <Tabs.Content
      backgroundColor="$white"
      key={value}
      padding="$2"
      alignItems="center"
      justifyContent="center"
      flex={1}
      borderColor="$white"
      borderRadius="$2"
      borderTopLeftRadius={0}
      borderTopRightRadius={0}
      borderWidth="$2"
      value={value}
    >
      {children}
    </Tabs.Content>
  )
}
