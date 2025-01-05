import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#a65cf7',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen name="index" options={{ title: 'Categories' }} />
      <Stack.Screen name="images" options={{ title: 'Select Scene' }} />
      <Stack.Screen name="pagerView" options={{ title: 'Gallery' }} />
      {/* <Stack.Screen name="gif" options={{ title: 'Gifs' }} /> */}
      <Stack.Screen name="showVideos" />
    </Stack>
  );
}