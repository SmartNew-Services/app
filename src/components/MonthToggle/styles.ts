import { ToggleGroup, styled } from 'tamagui'

export const MonthToggleGroup = styled(ToggleGroup, {
  unstyled: true,
  gap: '$4',
})

export const MonthToggleItem = styled(ToggleGroup.Item, {
  unstyled: true,
  p: '$4',
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
