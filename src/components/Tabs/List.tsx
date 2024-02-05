import { ReactElement } from 'react'
import { Tabs } from 'tamagui'

export function List({ children }: { children: ReactElement[] }) {
  return (
    <Tabs.List bg="$slate100" gap="$2" p="$2" width="$16" unstyled>
      {children}
    </Tabs.List>
  )
}
