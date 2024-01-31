import { Text } from '../Typography'
import dayjs from 'dayjs'
import { FlatList, TouchableOpacity } from 'react-native'
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
  console.log(months)

  function handleChangeMonth(value: string) {
    console.log(value)
    onValueChange(value)
  }

  return (
    <View>
      {/* <FlatList
        data={months}
        contentContainerStyle={{ gap: 8 }}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleChangeMonth(item)}>
            <MonthToggleItem key={item} active={item === value}>
              <Text>{item}</Text>
            </MonthToggleItem>
          </TouchableOpacity>
        )}
        horizontal
      /> */}
      {months.map((month) => (
        <MonthToggleItem
          key={month}
          active={month === value}
          onPress={() => onValueChange(month)}
        >
          <Text>{month}</Text>
        </MonthToggleItem>
      ))}
      <Text>{value}</Text>
    </View>
  )
}
