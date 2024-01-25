import { variantsColorButton, variantsSizeButton } from './styles'
import { ReactNode } from 'react'
import { useButtonTheme } from './Trigger'
import { Text as LibText, styled } from 'tamagui'

interface TextProps {
  children: ReactNode
}

type TextStyleProps = {
  variant: 'primary' | 'secondary'
  size: 'sm' | 'md' | 'lg'
}

// export function Text({ children }: TextProps) {
//   const { variant, size } = useButtonTheme()
//   return (
//     <TextStyle variant={variant} size={size}>
//       {children}
//     </TextStyle>
//   )
// }

export const Text = styled(LibText, {
  variants: {
    color: {
      '...color': (name, { tokens }) => ({
        color: tokens.color[name],
      }),
    },
  },
})

// const TextStyle = styled.Text<TextStyleProps>`
//   color: ${({ theme, variant }) => theme.color[variantsColorButton[variant]]};
//   font-weight: bold;
//   font-size: ${({ size }) => +variantsSizeButton[size]}px;
// `
