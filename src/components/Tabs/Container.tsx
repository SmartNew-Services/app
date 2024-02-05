import { ReactNode } from 'react'
import { Tabs } from 'tamagui'

interface ContainerProps {
  defaultValue: string
  children: ReactNode
}

export function Container({ children, defaultValue }: ContainerProps) {
  return (
    <Tabs
      defaultValue={defaultValue}
      orientation="horizontal"
      flexDirection="column"
      flex={1}
      overflow="hidden"
      borderColor="$borderColor"
    >
      {children}
    </Tabs>
  )
}
