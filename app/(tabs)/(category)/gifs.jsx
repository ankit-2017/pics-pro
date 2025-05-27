import React, { useState, useEffect, useCallback } from "react";
import {
  View, StyleSheet, Alert, RefreshControl,
  Pressable, ActivityIndicator,
  ScrollView
} from 'react-native'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { models } from '@/constants/models'

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
        setData(json.gifs?.slice(0,20));
        if (json.gifs?.length === 0){
          createThreeButtonAlert(getRandomInt(models.length))
        }
        } catch (error) {
          console.error(error);
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

  const showGifsInView = (item) => {
    router.push(`/pagerView?images=${JSON.stringify([item])}`)
  }

  const loadGifs = (data) => {
    if (data && data.length > 0) {
      return data.map ((item, index) => (
        <View key={index} style={styles.container}>
          <Pressable onPress={() => showGifsInView(item)}>
            <Image
              style={styles.image}
              source={item.url}
              contentFit="cover"
              autoplay
            />
          </Pressable>
        </View>
      ))
    }
    return null;
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    const pageNum1 = getRandomInt(models?.length)
    getImages(models[pageNum1]);
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={{ flex: 1, paddingVertical: 10, backgroundColor: '#3f4075' }}>
        {isLoading ? (
          <ActivityIndicator />
        ) : loadGifs(data)}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 0,
    marginVertical: 5
  },
  image: {
    height: 400,
    width: '100%',
    backgroundColor: '#0553',
  },
})