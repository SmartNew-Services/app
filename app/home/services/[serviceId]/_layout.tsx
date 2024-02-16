import { Stack } from 'expo-router'

function HideHeader() {
  return <></>
}

export default function LayoutTravel() {
  return <Stack screenOptions={{ header: HideHeader }} />
}
