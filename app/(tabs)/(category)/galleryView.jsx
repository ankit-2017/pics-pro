import React, { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { View, StyleSheet, Dimensions } from 'react-native';
import PagerView from 'react-native-pager-view';
import { Image } from 'expo-image';
import * as Progress from 'react-native-progress';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const { height, width } = Dimensions.get('window');

const GalleryView = () => {
  const { id, images } = useLocalSearchParams();
  const modalImages = images && JSON.parse(images);
  const [page, setPage] = useState(0);
  const [progressMap, setProgressMap] = useState({});

  const handleProgress = (index, event) => {
    if (event && event.loaded && event.total) {
      setProgressMap(prev => ({
        ...prev,
        [index]: event.loaded / event.total
      }));
    }
  };

  return (
    <View style={styles.container}>
      {modalImages && (
        <PagerView
          style={styles.pagerView}
          initialPage={0}
          orientation={'vertical'}
          onPageSelected={e => setPage(e.nativeEvent.position)}
        >
          {modalImages?.length > 0 &&
            modalImages.map((image, index) => (
              <View key={image.id || index} style={styles.page}>
                {Math.abs(page - index) <= 1 ? (
                  <View style={styles.imageWrapper}>
                    <Image
                      source={image.url}
                      style={styles.image}
                      placeholder={{ blurhash }}
                      contentFit='contain'
                      autoplay
                      // cachePolicy="disk"
                      onProgress={event => handleProgress(index, event)}
                    />
                    {(progressMap[index] !== undefined && progressMap[index] < 1) && (
                      <View style={styles.progressOverlay}>
                        <Progress.Circle
                          size={60}
                          progress={progressMap[index]}
                          showsText={true}
                          color="rgba(28, 32, 252, 1)"
                          thickness={6}
                          borderWidth={0}
                          unfilledColor="rgba(28, 32, 252, 0.2)"
                        />
                      </View>
                    )}
                  </View>
                ) : (
                  <View style={styles.image} />
                )}
              </View>
            ))}
        </PagerView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3f4075',
  },
  pagerView: {
    flex: 1,
  },
  page: {
    backgroundColor: '#3f4075',
    justifyContent: 'center',
    alignItems: 'flex-end',
    transform: [{ rotate: '90deg' }],
    height: height, // because rotated
    width: width,
  },
  imageWrapper: {
    width: 650,
    height: '100%'
  },
  image: {
    aspectRatio: 0.80,
    width: '100%',
    height: '100%',
    backgroundColor: '#3f4075',
  },
  progressOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -30,
    marginTop: -30,
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GalleryView;