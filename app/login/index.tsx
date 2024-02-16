import { Form } from '@/src/components/Form'
import { Text, Title } from '@/src/components/Typography'
import { useAuth } from '@/src/store/auth'
import { useConnection } from '@/src/store/connection'
import { zodResolver } from '@hookform/resolvers/zod'
import { router } from 'expo-router'
// import { useToastState } from '@tamagui/toast'
import { AlertTriangle, LucideArrowRight } from 'lucide-react-native'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, View, XStack, YStack } from 'tamagui'
import { z } from 'zod'

const loginSchema = z.object({
  login: z.string({ required_error: 'Login obrigatório' }),
  pass: z.string({ required_error: 'Senha obrigatória' }),
})

export type LoginData = z.infer<typeof loginSchema>

const { height, width } = Dimensions.get('screen')

export default function Login() {
  const { isConnected } = useConnection()
  const { user, token, retrieveToken, retrieveUser, handleLogin } = useAuth()
  const loginForm = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  })
  // const toast = useToastState()
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = loginForm

  async function handleFormLogin(data: LoginData) {
    try {
      handleLogin(data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    retrieveToken()
    retrieveUser()
    if (token && user) {
      router.replace('/home')
    }
  }, [token])

  return (
    <View f={1} backgroundColor="$purple500">
      <SafeAreaView style={{ flex: 1 }}>
        <View f={1} p="$6">
          <YStack f={1} jc="flex-end" gap="$4">
            <Title color="#fff" fontSize="$3">
              Faça Login para continuar
            </Title>
          </YStack>
        </View>
        <YStack
          backgroundColor="#fff"
          h="40%"
          p="$6"
          borderTopLeftRadius="$8"
          borderTopRightRadius="$8"
        >
          <FormProvider {...loginForm}>
            <View gap="$3">
              <View gap="$2">
                <Text>Login:</Text>
                <Form.Input
                  autoCorrect={false}
                  allowFontScaling={false}
                  autoCapitalize="none"
                  name="login"
                  placeholder="Insira seu login"
                />
              </View>

              <View gap="$2">
                <Text>Senha:</Text>
                <Form.Input
                  name="pass"
                  autoCorrect={false}
                  allowFontScaling={false}
                  autoCapitalize="none"
                  secureTextEntry
                  placeholder="Insira sua senha"
                />
              </View>
              <Button
                onPress={handleSubmit(handleFormLogin)}
                w="100%"
                theme="button-test"
              >
                Fazer login
                <LucideArrowRight width={20} height={20} color="#FFF" />
              </Button>

              {isConnected || (
                <XStack w="100%" jc="center" ai="center" gap="$2">
                  <AlertTriangle color="red" size={16} />
                  <Text fontSize="$2" color="$red400">
                    Off-line
                  </Text>
                </XStack>
              )}
            </View>
          </FormProvider>
        </YStack>
      </SafeAreaView>
    </View>
  )
}
