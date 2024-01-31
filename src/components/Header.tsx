import { router } from 'expo-router'
import { ChevronLeft, Menu, RefreshCcw, Wifi } from 'lucide-react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Button, XStack, useTheme } from 'tamagui'
import { Text } from './Typography'

export function Header() {
  const insets = useSafeAreaInsets()

  return (
    <XStack
      p="$4"
      pt={insets.top}
      bg="$background"
      borderBottomColor="$slate300"
      borderBottomWidth={1}
      w="100%"
      ai="center"
      jc="space-between"
    >
      <XStack gap="$4">
        {router.canGoBack() && (
          <Button onPress={() => router.back()}>
            <ChevronLeft width={16} height={16} color="#000" />
          </Button>
        )}

        <XStack
          bg="$green200"
          px="$2"
          py="$0.5"
          ai="center"
          gap="$2"
          borderRadius={999}
        >
          <Wifi width={16} height={16} color="#16a34a" />
          <Text color="$green600">On-line</Text>
        </XStack>
      </XStack>

      <XStack>
        <Button
          theme="button-secondary"
          size="$4"
          borderRadius={999}
          aspectRatio="1/1"
        >
          <RefreshCcw width={16} height={16} color="#7c3aed" />
        </Button>

        <Button size="$4">
          <Menu width={16} height={16} color="#000" />
        </Button>
      </XStack>
    </XStack>
  )
}
