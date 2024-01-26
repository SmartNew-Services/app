import { XStack, styled } from 'tamagui'

export const ContainerCard = styled(XStack, {
  p: '$4',
  gap: '$5',

  variants: {
    type: {
      solid: {
        bg: '$slate300',
        borderRadius: '$2',
      },

      transparent: {
        bg: 'transparent',
        px: 0,
      },
    },
  },

  defaultVariants: {
    type: 'solid',
  },
})
