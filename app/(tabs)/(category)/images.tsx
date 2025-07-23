import React, { useState, useEffect } from "react";
import {
  View, Text, Button, StyleSheet, Platform, Alert,
  Pressable, ActivityIndicator, FlatList, Image, ImageSourcePropType
} from 'react-native'
import { Link, useRouter } from 'expo-router'
import { models } from '@/constants/models'
import { SafeAreaView } from "react-native-safe-area-context";

type resultProps = {
  url: string | undefined;
  id: string;
  imgId: number;
};

type ImageArray = {
  id: string,
  url: string,
  imgId: number
}

export default function ShowImages () {
  const router = useRouter()
  const [isLoading, setLoading] = useState(true);
  const [imageId, setImageId] = useState('');
  const [data, setData] = useState<resultProps []>([]);
  const baseUrl = process.env.EXPO_PUBLIC_API_URL

  function getRandomInt(max: number) {
    return Math.ceil(Math.random() * max);
  }

  const pageNum = getRandomInt(models?.length)

  const getImagesFromId = async (id: string) => {
      // console.log('string=>', string)
      try {
        setImageId(id)
        const response = await fetch(`${baseUrl}/api/v1/get-images-from-id?param=${id}`);
        const json = await response.json();
        router.push(`/pagerView?images=${JSON.stringify(json?.images)}`)
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
          setImageId('')
        }
    }
  
  const getImages = async (string: string) => {
    // console.log('string=>', string)
      try {
        const response = await fetch(`${baseUrl}/api/v1/get-media?param=${string}`);
        const json = await response.json();
        // console.log('o json', json)
        const jsonImages = json?.images?.map((item: object, index: number): ImageArray => ({ id: item.id, url: item.url, "imgId": index+1 }))
        // console.log('json===>', jsonImages)
        setData(jsonImages);
        if (jsonImages?.length === 0){
          createThreeButtonAlert(getRandomInt(models.length))
        }
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
          // setSearch('')
        }
  }
  const createThreeButtonAlert = (index: number) =>
    Alert.alert('Not Found', 'Images of specific model not found. Try with another.', [
      {text: 'Try another', onPress: () => getImages(models[index])}
    ]);
  useEffect(() => {
    getImages(models[pageNum]);
  }, []);
  // console.log('data=>', data)
  return (
    <View style={{ flex: 1, padding: 10, backgroundColor: '#3f4075' }}>
      {isLoading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'white', fontSize: 18 }}>Loading Images...</Text>
          <ActivityIndicator />
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={({ id }) => id}
          numColumns={2}
          renderItem={({ item }) => (
            <View style={styles.container}>
              {
                imageId === item.id && (
                  <View style={styles.overlayContainer}>
                    <ActivityIndicator size="large" color="white"/>
                  </View>
              )
              }
                  <Pressable onPress={() => getImagesFromId(item.id)}>
                    <Image
                      style={styles.image}
                      source={{
                        uri: item.url
                      }}
                    />
                </Pressable>
                )
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    margin: 5,
    position: 'relative'
  },
  overlayContainer: {
    backgroundColor: 'gray',
    // opacity: 0.2,
    position: 'absolute',
    top: '50%',
    left: '40%',
    zIndex: 999999
  },
  buttonWrapper: {
    flex: 1,
    fontFamily: 'Signika',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    borderRadius: 5,
    height: 250,
    width: '100%',
    resizeMode: 'cover',
    backgroundColor: '#0553',
  },
})