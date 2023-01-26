import React, {useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet, useWindowDimensions, View} from 'react-native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import MainTabParams from '../navigation/MainTabParams';
import AppScreen from '../components/ui/AppScreen';
import useTranslations from '../hooks/useTranslations';
import NoCameras from '../components/ui/cameras/NoCameras';
import Swiper from 'react-native-swiper';
import {useGetCamerasQuery} from '../api/apiService';
import CameraView from '../components/ui/cameras/CameraView';
import usePrevious from '../hooks/usePrevious';
import {Cameras} from '../api/apiTypes';
import FullScreenCamera from '../components/ui/cameras/FullScreenCamera';

type ScreenProps = BottomTabScreenProps<MainTabParams, 'Cameras', 'Cameras'>;

const findCameraIndex = (data: Cameras, activeCameraId: string | undefined) => {
  return data.findIndex(i => i?.id === activeCameraId) ?? 0;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CamerasScreen = ({navigation, route}: ScreenProps) => {
  const T = useTranslations();
  const {data} = useGetCamerasQuery(null);
  const [isFullScreen, setFullScreen] = useState(false);
  const {width} = useWindowDimensions();
  const swiperRef = useRef(null);
  const [cards, setCards] = useState<Array<any> | null>(null);

  const [curIndex, setCurIndex] = useState<number>(
    data && route?.params?.activeCameraId
      ? findCameraIndex(data, route.params.activeCameraId)
      : 0,
  );
  const prevActiveCameraId = usePrevious(route?.params?.activeCameraId ?? 0);

  /** full screen toggle
   *
   */
  const onClick = useCallback(() => {
    setFullScreen(!isFullScreen);
  }, [isFullScreen]);

  // create camera cards
  useEffect(() => {
    if (data) {
      console.log('create cards');
      const newCards = data?.map(i => (
        <CameraView
          onClick={onClick}
          key={'cview' + i?.id.toString() + '_' + width.toString()}
          cameraId={i?.id}
        />
      ));
      setCards(newCards);
    }
  }, [data, onClick, width]);
  useEffect(() => {
    console.log(
      `prev=${prevActiveCameraId} cur=${route?.params?.activeCameraId}`,
    );
    if (
      prevActiveCameraId &&
      data &&
      prevActiveCameraId !== route.params.activeCameraId
    ) {
      const newIndex = findCameraIndex(data, route.params.activeCameraId ?? '');
      setCurIndex(newIndex);
      setFullScreen(false);
      console.log(
        'Route param changed to ',
        route.params.activeCameraId,
        ' newIndex = ',
        newIndex,
      );
      //swiperRef?.current?.scrollBy(newIndex, false);
    }
  }, [data, prevActiveCameraId, route.params?.activeCameraId]);
  /*useEffect(() => {
    if (prevWidth !== width && prevWidth) {
      console.log('Width changed: ', width);
      setTimeout(() => {
        // rescroll to index (fix bug)
        //console.log('Rescroll to ', curIndex);
        //swiperRef.current.scrollBy(curIndex, false);
      }, 150);
    }
  }, [width]);*/

  if (!(data && data?.length > 1)) {
    return (
      <View style={styles.center}>
        <NoCameras />
      </View>
    );
  }

  const onIndexChanged = (newIndex: number) => {
    setCurIndex(newIndex);
  };

  const swiperKey = `swiper_${route?.params?.activeCameraId}_${width}`;

  console.log('cards = ', cards);
  console.log('Current index: ', curIndex, ' key=', swiperKey);
  //console.log("Active idx = ",activeCameraIdx, "rparama=",route?.params?.activeCameraId);
  if (!cards) {
    return null;
  }
  return isFullScreen ? (
    <FullScreenCamera onClick={onClick} cameraId={data[curIndex]?.id} />
  ) : (
    <AppScreen title={T.Screen_Cameras}>
      <View style={styles.flex1}>
        <Swiper
          key={swiperKey}
          showsButtons={true}
          ref={swiperRef}
          index={findCameraIndex(data, route?.params?.activeCameraId)}
          onIndexChanged={onIndexChanged}>
          {cards}
        </Swiper>

        {/*<SwiperFlatList
          autoplay={false}
          index={curIndex}
          showPagination
          data={data}
          renderItem={({item}) => (
            <CameraView
              key={'cview' + item?.id.toString() + '_' + width.toString()}
              cameraId={item?.id}
            />
          )}
        />*/}
        {/*<View style={styles.bottomBox}>
          <Text h5>{T.Last_Update}: </Text>
        </View>*/}
      </View>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  center: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  flex1: {flex: 1},
  viewBox: {
    width: 100,
    height: 100,
  },
  bottomBox: {
    //height: 50
  },
});

export default CamerasScreen;
