import { useRef } from 'react'
import { View, StyleSheet, Pressable } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Zoomable } from '@likashefqet/react-native-image-zoom'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image'
import PagerView from 'react-native-pager-view';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export default function ImageView() {
  const pagerRef = useRef()
  const zoomRef = useRef()
  const { id, images } = useLocalSearchParams()
  const modalImages = images && JSON.parse(images)
  console.log('id', id)

  const disableScroll = () => {
    pagerRef?.current?.setScrollEnabled(false)
  }

  const enableScroll = () => {
    pagerRef?.current?.setScrollEnabled(true)
  }

  return (
    <View style={{flex: 1}}>
      <PagerView
        ref={pagerRef}
        style={styles.container}
        initialPage={0}
        scrollEnabled={true}
      >
        {
          modalImages?.length > 0 && modalImages.map((item: any) => (
            <GestureHandlerRootView key={item.imgId || item.id}>
              <Zoomable
                ref={zoomRef}
                minScale={1}
                maxScale={5}
                doubleTapScale={3}
                isSingleTapEnabled
                isDoubleTapEnabled
                onInteractionStart={() => {
                  console.log('onInteractionStart');
                  disableScroll()
                }}
                onDoubleTap={(zoomType) => {
                  console.log('onDoubleTap', zoomType);
                  if (zoomType === 'ZOOM_OUT') {
                    enableScroll()
                  } else if (zoomType === 'ZOOM_IN') {
                    disableScroll()
                  }
                }}
                style={styles.image}
                onResetAnimationEnd={(finished, values) => {
                  if (values?.SCALE.lastValue === 1) {
                    enableScroll()
                  }
                }}
              >
                <Image
                  style={styles.image}
                  source={item.url}
                  placeholder={{ blurhash }}
                  contentFit="contain"
                  transition={1000}
                />
              </Zoomable>
            </GestureHandlerRootView>
          ))
        }
      </PagerView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    flex: 1,
    backgroundColor: '#0553',
  },
  close: {
    margin: 5,
    position: 'absolute',
    top: 30,
    left: 20,
    width: 35,
    height: 35
  }
})