import { Image, StyleSheet, View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router'
import { LinearGradient } from "expo-linear-gradient";


export default function HomeScreen() {
  const router = useRouter()
  return (
    <LinearGradient
        colors={["#a65cf7", "#2f31d4"]}
        style={{ flex: 1 }}
      >
        <View className='p-4 flex flex-row flex-wrap justify-around gap-4'>
          <Pressable onPress={() => router.navigate('/images')}>
            <View className='bg-slate-600 rounded-lg items-center justify-center p-2'>
                <Image
                  style={{ position: 'relative', borderRadius: 5 }}
                  source={require('@/assets/images/pixel-demo.jpg')}
                  className='w-[150px] h-[200px]'
                />
                <Text style={styles.imgText}>Images</Text>
            </View>
          </Pressable>
          <Pressable onPress={() => router.navigate('/gifs')}>
            <View className=' bg-slate-600 rounded-lg items-center justify-center p-2'>
              <Image
                style={{ position: 'relative', borderRadius: 5 }}
                source={require('@/assets/images/pixel-demo.jpg')}
                className='w-[150px] h-[200px]'
              />
              <Text
                style={styles.imgText}>
                  Gifs
              </Text>
            </View>
          </Pressable>
          <View className=' bg-slate-600 rounded-lg items-center justify-center p-2'>
            <Image
              style={{ position: 'relative', borderRadius: 5 }}
              source={require('@/assets/images/pixel-demo.jpg')}
              className='w-[150px] h-[200px]'
            />
            <Text
              style={styles.imgText}>
                Videos
            </Text>
          </View>
          <View className=' bg-slate-600 rounded-lg items-center justify-center p-2'>
          <Image
              style={{ position: 'relative', borderRadius: 5 }}
              source={require('@/assets/images/pixel-demo.jpg')}
              className='w-[150px] h-[200px]'
            />
            <Text
              style={styles.imgText}>
                Wallpapers
            </Text>
          </View>
        </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  imgText: {
    position: 'absolute',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    bottom: '5%',
    left: '40%',
    zIndex: 9999
  },
  image: {
    width: 150,
    height: 200,
    borderRadius: 5,
  },
});
