import React, { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import PagerView from 'react-native-pager-view';
import { Image } from 'expo-image';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


const GalleryView = () => {
  const { id, images } = useLocalSearchParams()
  const modalImages = images && JSON.parse(images)

  return (
    <View style={styles.container}>
    {
      modalImages && (
          <PagerView
            style={styles.pagerView}
            initialPage={0}
            orientation={'vertical'}
          >
            {modalImages?.length > 0 && modalImages.map((image, index) => (
              <View key={image.id || index} style={styles.page}>
                <Image
                  source={image.url}
                  style={styles.image}
                  placeholder={{ blurhash }}
                  contentFit='contain'
                  autoplay
                  allowDownscaling
                />
              </View>
            ))}
          </PagerView>
      )
    }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  pagerView: {
    flex: 1,
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '90deg' }],
  },
  image: {
    width: 650,
    height: '100%',
  },
});

export default GalleryView;