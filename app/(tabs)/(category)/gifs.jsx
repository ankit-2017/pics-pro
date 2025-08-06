import React, { useState, useEffect, useCallback } from "react";
import {
  View, StyleSheet, Alert, RefreshControl,
  Pressable, ActivityIndicator,
  ScrollView
} from 'react-native'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { models } from '@/constants/models'
import { SafeAreaView } from "react-native-safe-area-context";
import UserButton from "@/components/ui/Button";

export default function ShowGifs () {
  const router = useRouter()

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const baseUrl = process.env.EXPO_PUBLIC_API_URL

  function getRandomInt(max) {
    return Math.ceil(Math.random() * max);
  }

  const pageNum = getRandomInt(models?.length)
  
  const getImages = async (string) => {
      try {
        const response = await fetch(`${baseUrl}/api/v1/get-gifs?param=${string}`);
        const json = await response.json();
        if (json.gifs?.length === 0){
          createThreeButtonAlert(getRandomInt(models.length))
          return;
        }
        setData(json?.gifs);
        
        } catch (error) {
          console.error(error);
          createThreeButtonAlert(getRandomInt(models.length))
        } finally {
          setLoading(false);
          setRefreshing(false);
        }
  }
  const createThreeButtonAlert = (index) =>
    Alert.alert('Not Found', 'Images of specific model not found. Try with another.', [
      {text: 'Try another', onPress: () => getImages(models[index])}
    ]);


  useEffect(() => {
    getImages(models[pageNum]);
  }, []);

  const showGifsInView = (items) => {
    const parsedData = JSON.stringify(items)
    router.push(`/galleryView?images=${parsedData}`)
  }

  const loadGifs = (data) => {
    if (data && data.length > 0) {
      return data.map ((item, index) => (
        <View key={index} className="p-2 rounded-lg items-center justify-center">
          <Pressable onPress={() => showGifsInView(data)}>
            <Image
              style={styles.image}
              source={item.url}
              contentFit="cover"
              autoplay={false}
            />
          </Pressable>
        </View>
      ))
    }
    return null;
  }

  const loadGifsInPagerView = (data) => {
    if (data && data.length > 0) {
      return (
        <View style={{ flex: 1, width: '100%', paddingInline: 10 }}>
          <UserButton
            onPress={() => showGifsInView(data)}
            title="Show Gifs"
            type="linear"
            backgroundColor={["#f73946", "#e0468e"]}
            customStyles={{ marginTop: 16 }}
          />
        </View>
      )
    }
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    const pageNum1 = getRandomInt(models?.length)
    getImages(models[pageNum1]);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#3f4075' }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="flex flex-row flex-wrap justify-around gap-1">
          {isLoading ? (
            <View>
              <ActivityIndicator />
            </View>
          ) : loadGifsInPagerView(data)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 0,
    marginVertical: 5,
  },
  image: {
    height: 250,
    width: 170,
    borderRadius: 5,
    backgroundColor: 'gray'
  },
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3f4075'
  }
})