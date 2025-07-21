import React, { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { View, StyleSheet, StatusBar } from 'react-native';
import PagerView from 'react-native-pager-view';

const GalleryView = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const { id, images } = useLocalSearchParams()
  const modalImages = images && JSON.parse(images)
  const handlePageChange = (e) => {
    setCurrentIndex(e.nativeEvent.position);
  };

  return (
    <View style={styles.container}>
      <PagerView
        style={styles.pagerView}
        initialPage={0}
        onPageSelected={handlePageChange}
        orientation={'vertical'}
      >
        {modalImages.length > 0 && modalImages.map((image, index) => (
          <View key={index} style={styles.page}>
            <Image
              source={{ uri: image.url }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
        ))}
      </PagerView>
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