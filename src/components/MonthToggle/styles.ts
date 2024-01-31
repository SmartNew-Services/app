import { TouchableOpacity } from 'react-native'
import { ToggleGroup, styled } from 'tamagui'

export const MonthToggleGroup = styled(ToggleGroup, {
  unstyled: true,
  gap: '$4',
})

export const MonthToggleItem = styled(TouchableOpacity, {
  px: '$4',
  py: '$2',
  borderWidth: 1,
  borderColor: '$slate300',
  borderRadius: 999,

  variants: {
    active: {
      true: {
        bg: '$black',
      },
    },
  },
})
