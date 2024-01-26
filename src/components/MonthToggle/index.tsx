import { useState } from 'react'
import { Text } from '../Typography'
import { MonthToggleGroup, MonthToggleItem } from './styles'

export function MonthToggle() {
  const [active, setActive] = useState<string>()
  console.log(active)

  return (
    <MonthToggleGroup
      type="single"
      defaultValue="test"
      value={active}
      onValueChange={setActive}
    >
      <MonthToggleItem value="test">
        <Text>Test</Text>
      </MonthToggleItem>
      <MonthToggleItem value="test2">
        <Text>Test2</Text>
      </MonthToggleItem>
      <MonthToggleItem value="test3">
        <Text>Test3</Text>
      </MonthToggleItem>
    </MonthToggleGroup>
  )
}
