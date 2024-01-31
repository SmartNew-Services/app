import dayjs from 'dayjs'
import { FlatList } from 'react-native'
import { View } from 'tamagui'
import { MonthToggleItem } from './styles'

interface MonthToggleProps {
  value: string
  onValueChange: (param: string) => void
}

export function MonthToggle({ value, onValueChange }: MonthToggleProps) {
  const months = Array.from({ length: 3 }, (_, index) =>
    dayjs()
      .month(dayjs().month() + index)
      .format('MMMM'),
  )

  return (
    <View>
      <FlatList
        data={months}
        contentContainerStyle={{ gap: 8 }}
        renderItem={({ item }) => (
          <MonthToggleItem
            key={item}
            active={item === value}
            onPress={() => onValueChange(item)}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </MonthToggleItem>
        )}
        horizontal
      />
    </View>
  )
}
