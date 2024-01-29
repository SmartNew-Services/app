import { Text } from '../Typography'
import dayjs from 'dayjs'
import { FlatList } from 'react-native'

export function MonthToggle() {
  const months = Array.from({ length: 3 }, (_, index) =>
    dayjs()
      .month(dayjs().month() + index)
      .format('MMMM'),
  )
  console.log(months)

  return (
    <FlatList
      data={months}
      renderItem={({ item }) => <Text key={item}>{item}</Text>}
    />
  )
}
