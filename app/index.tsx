import { CustomButton } from '@/components/CustomButton'
import { router } from 'expo-router'
import { Plus } from 'lucide-react-native'
import { View } from 'tamagui'

export default function AppIndex() {
  return (
    <View flex={1} justifyContent="center" backgroundColor="$background">
      <CustomButton onPress={() => router.push('/home/')} size="$6">
        <Plus width={16} height={16} color={'#FFF'} />
      </CustomButton>
    </View>
  )
}
