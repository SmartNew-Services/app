import { Button, ToggleGroup, styled } from 'tamagui'

export const MonthToggleGroup = styled(ToggleGroup, {
  unstyled: true,
  gap: '$4',
})

export const MonthToggleItem = styled(Button, {
  px: '$4',
  py: '$2',
  borderWidth: 1,
  borderColor: '$slate300',
  borderRadius: 999,
  color: '$black',

  variants: {
    active: {
      true: {
        bg: '$black',
        color: '$white',
      },
    },
  },
})
