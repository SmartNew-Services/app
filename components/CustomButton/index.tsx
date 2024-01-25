import {
  ButtonFrame,
  ButtonText,
  GetProps,
  ButtonProps as TamaguiButtonProps,
  styled,
  useButton,
} from 'tamagui'

const CustomButtonFrame = styled(ButtonFrame, {
  // variants: {
  // }
})

const CustomButtonText = styled(ButtonText, {
  fontSize: '$6',
})

type CustomButtonFrameProps = GetProps<typeof CustomButtonFrame>
type CustomButtonTextProps = GetProps<typeof CustomButtonText>

export type CustomButtonProps = TamaguiButtonProps &
  CustomButtonFrameProps &
  CustomButtonTextProps

export const CustomButton = CustomButtonFrame.styleable<CustomButtonProps>(
  (propsIn, ref) => {
    const { props } = useButton(propsIn, { Text: CustomButtonText })
    return <CustomButtonFrame {...props} ref={ref} />
  },
)
