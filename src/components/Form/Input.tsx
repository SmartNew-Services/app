import { useController, useFormContext } from 'react-hook-form'
import { TextInputProps } from 'react-native'
import { Input } from 'tamagui'
// import { Input, TamaguiComponent } from 'tamagui'

interface InputType extends TextInputProps {
  name?: string
}

export function FormInput({ name = 'input' }: InputType) {
  const { control } = useFormContext()
  const { field } = useController({
    control,
    name,
  })

  return (
    <Input
      value={field.value}
      onChangeText={field.onChange}
      borderColor="#E4E4E7"
      color="#3F3F46"
    />
  )
}
