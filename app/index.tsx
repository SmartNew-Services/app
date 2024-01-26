import { Title } from '@/src/components/Typography'
import { router } from 'expo-router'
import { LucideArrowRight } from 'lucide-react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, View, YStack } from 'tamagui'
import LogoSvg from '../assets/images/logo-white-horizontal.svg'

export default function AppIndex() {
  return (
    <View flex={1} backgroundColor="$purple500">
      <SafeAreaView style={{ flex: 1 }}>
        <View jc="center" ai="center" f={1} p="$6">
          <YStack f={1} jc="center" gap="$4">
            <LogoSvg width={200} height={77} />
            <Title color="$white" fontSize="$4">
              Olá 👋, seja bem vindo ao Smart Services!
            </Title>
          </YStack>
          <Button
            onPress={() => router.push('/home/')}
            w="100%"
            theme="button-test"
          >
            Iniciar
            <LucideArrowRight width={20} height={20} color="#FFF" />
          </Button>
        </View>
      </SafeAreaView>
    </View>
  )
}
