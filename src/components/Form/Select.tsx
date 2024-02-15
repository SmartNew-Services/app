import { Check, ChevronDown, ChevronUp } from 'lucide-react-native'
import { useMemo } from 'react'
import { useController, useFormContext } from 'react-hook-form'
import type { FontSizeTokens, SelectProps } from 'tamagui'
import { Adapt, Select, YStack, getFontSize } from 'tamagui'
import { LinearGradient } from 'tamagui/linear-gradient'
import { SheetModal } from '../SheetModal'

interface FormSelectProps extends SelectProps {
  name?: string
  placeholder: string
  options: {
    name: string
    value: string
  }[]
}

export function FormSelect({
  name = 'select',
  placeholder,
  options,
  ...props
}: FormSelectProps) {
  const { control } = useFormContext()
  const { field } = useController({
    control,
    name,
  })

  return (
    <Select
      value={field.value}
      name={name}
      onValueChange={field.onChange}
      disablePreventBodyScroll
      {...props}
    >
      <Select.Trigger width="100%" iconAfter={<ChevronDown />}>
        <Select.Value placeholder={placeholder} />
      </Select.Trigger>
      <Adapt when="sm" platform="touch">
        <SheetModal>
          <SheetModal.Overlay />
          <SheetModal.Frame>
            <Adapt.Contents />
          </SheetModal.Frame>
        </SheetModal>
      </Adapt>
      <Select.Content zIndex={200000}>
        <Select.ScrollUpButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        >
          <YStack zIndex={10}>
            <ChevronUp size={20} />
          </YStack>

          <LinearGradient
            start={[0, 0]}
            end={[0, 1]}
            fullscreen
            colors={['#000000', 'transparent']}
            borderRadius="$4"
          />
        </Select.ScrollUpButton>
        <Select.Viewport minWidth={200}>
          <Select.Group>
            {useMemo(
              () =>
                options.map((item, i) => {
                  return (
                    <Select.Item index={i} key={item.name} value={item.value}>
                      <Select.ItemText>{item.name}</Select.ItemText>

                      <Select.ItemIndicator marginLeft="auto">
                        <Check size={16} />
                      </Select.ItemIndicator>
                    </Select.Item>
                  )
                }),

              [options],
            )}
          </Select.Group>

          {props.native && (
            <YStack
              position="absolute"
              right={0}
              top={0}
              bottom={0}
              alignItems="center"
              justifyContent="center"
              width={'100%'}
              pointerEvents="none"
            >
              <ChevronDown
                size={getFontSize((props.size as FontSizeTokens) ?? '$true')}
              />
            </YStack>
          )}
        </Select.Viewport>
        <Select.ScrollDownButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        >
          <YStack zIndex={10}>
            <ChevronDown size={20} />
          </YStack>

          <LinearGradient
            start={[0, 0]}
            end={[0, 1]}
            fullscreen
            colors={['transparent', '$background']}
            borderRadius="$4"
          />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select>
  )
}
