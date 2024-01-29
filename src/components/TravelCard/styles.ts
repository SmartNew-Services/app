import { XStack, styled } from 'tamagui'

export const ContainerCard = styled(XStack, {
  p: '$4',
  gap: '$5',

  variants: {
    variant: {
      solid: {
        bg: '$slate100',
        borderRadius: 8,
      },

      transparent: {
        bg: 'transparent',
        px: 0,
      },
    },
  },

  defaultVariants: {
    variant: 'solid',
  },
})
