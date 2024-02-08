import { Stack, styled, createSheet, Sheet } from 'tamagui'

const Handle = styled(Stack, {
  bg: '#ffffff90',
  height: 12,
  width: 200,
  borderRadius: 999,
  // transform: 'translateX()',
  transformOrigin: 'center',
  marginHorizontal: 'auto',
  variants: {
    open: {
      true: {
        opacity: 1,
      },
      false: {
        opacity: 1,
      },
    },
  } as const,
})

const Overlay = styled(Stack, {
  bg: '#00000090',
  flex: 1,
  variants: {
    open: {
      true: {
        opacity: 0.2,
        pointerEvents: 'auto',
      },
      false: {
        opacity: 0.5,
        pointerEvents: 'none',
      },
    },
  } as const,
})

const Frame = styled(Stack, {
  backgroundColor: '$white',
  mt: 12,
  borderTopLeftRadius: 12,
  borderTopRightRadius: 12,
})

export const SheetModal = createSheet({
  Frame,
  Handle,
  Overlay,
})
