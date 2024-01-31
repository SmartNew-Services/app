import { Header } from '@/src/components/Header'
import { Stack } from 'expo-router'

export default function LayoutHome() {
  return <Stack screenOptions={{ header: Header }} />
}
