import { ReactElement } from 'react'
import { Tabs, TabsTabProps } from 'tamagui'

interface TabProps extends TabsTabProps {
  active: boolean
  children: ReactElement
}

export function Tab({ active, children, ...props }: TabProps) {
  return (
    <Tabs.Tab
      flex={1}
      bg={active ? '$white' : '$slate100'}
      px="0"
      borderRadius="$2"
      {...props}
    >
      {children}
    </Tabs.Tab>
  )
}
