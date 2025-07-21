import { Image, StyleSheet, View, Platform, Pressable } from 'react-native';
import { useRouter } from 'expo-router'
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from '@/components/ThemedText';

const thumbnail = 'https://x.sxypix.com/pixi/mN7wnsDDat6z8MRf8tOYsg/1736125200/s/615a7a2fd5132/cf420cdeb438f3a11f6cb3bd5d905f07/cc3205b2553825154bdfe9f428a9fc49.jpg%22%7D,%7B%22id%22:%22f822858579bb7bd512892fa7f6cce269%22,%22url%22:%22https://x.sxypix.com/pixi/TZmfv6-cBp57Lb_JoDSgmA/1736125200/s/3363005651/f822858579bb7bd512892fa7f6cce269/4243b9f9ee4986bc9e8ba05176ce17f3.jpg'

export default function HomeScreen() {
  const router = useRouter()
  return (
      <LinearGradient
        colors={["#a65cf7", "#2f31d4"]}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View className='p-4 flex flex-row flex-wrap justify-around gap-4'>
            <Pressable onPress={() => router.navigate('/images')}>
              <View className='bg-slate-600 rounded-lg items-center justify-center p-2'>
                  <Image
                    style={{ position: 'relative', borderRadius: 5 }}
                    source={{
                      uri: thumbnail
                    }}
                    className='w-[150px] h-[200px]'
                  />
                  <ThemedText style={{ position: 'absolute', bottom: '5%', left: '40%', zIndex: 9999 }} >Images</ThemedText>
              </View>
            </Pressable>
            <Pressable onPress={() => router.navigate('/gifs')}>
              <View className=' bg-slate-600 rounded-lg items-center justify-center p-2'>
                <Image
                  style={{ position: 'relative', borderRadius: 5 }}
                  source={{
                    uri: thumbnail
                  }}
                  className='w-[150px] h-[200px]'
                />
                <ThemedText
                  style={{ position: 'absolute', bottom: '5%', left: '40%', zIndex: 9999 }}>
                    Gifs
                </ThemedText>
              </View>
            </Pressable>
            <View className=' bg-slate-600 rounded-lg items-center justify-center p-2'>
              <Image
                style={{ position: 'relative', borderRadius: 5 }}
                source={{
                  uri: thumbnail
                }}
                className='w-[150px] h-[200px]'
              />
              <ThemedText
                style={{ position: 'absolute', bottom: '5%', left: '40%', zIndex: 9999 }}>
                  Videos
              </ThemedText>
            </View>
            <View className=' bg-slate-600 rounded-lg items-center justify-center p-2'>
            <Image
                style={{ position: 'relative', borderRadius: 5 }}
                source={{
                  uri: thumbnail
                }}
                className='w-[150px] h-[200px]'
              />
              <ThemedText
                style={{ position: 'absolute', bottom: '5%', left: '40%', zIndex: 9999 }}>
                  Wallpapers
              </ThemedText>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
  )
}
