/**
 * Portrait mode cameras
 * Create scrollable view
 */
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import MainTabParams from '../../navigation/MainTabParams';
import {useGetCamerasQuery} from '../../api/apiService';
import React from 'react';
import CameraSwipeSlide from '../ui/cameras/CameraSwipeSlide';
import {ScrollView, StyleSheet, useWindowDimensions, View} from 'react-native';

type ScreenProps = BottomTabScreenProps<MainTabParams, 'Cameras', 'Cameras'> & {
  onFullScreen: (id: string) => void;
};

const CamerasPortrait = ({onFullScreen}: ScreenProps) => {
  const {data} = useGetCamerasQuery(null);
  const {width} = useWindowDimensions();
  //const [isFullScreen, setFullScreen] = useState(false);
  //const defaultCameraIndex = useCameraIndex(data, route.params.activeCameraId);

  /*const onClick = useCallback(
    idx => {
      setCurIndex(idx);
      setFullScreen(!isFullScreen);
    },
    [isFullScreen],
  );*/

  /*const [curIndex, setCurIndex] = useState<number>(
    data && route?.params?.activeCameraId ? defaultCameraIndex : 0,
  );*/

  // create camera items
  const cards = data?.map(i => (
    <CameraSwipeSlide
      onClick={() => {
        onFullScreen(i?.id);
      }}
      key={'cview' + i?.id.toString() + '_' + width.toString()}
      cameraId={i?.id}
      width={400}
      height={200}
    />
  ));

  if (!data) {
    return null;
  }
  console.log('Render portrait');
  return (
    <View style={styles.portraitContainer}>
      <ScrollView style={styles.flex1}>{cards}</ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  flex1: {flex: 1},
  portraitContainer: {
    flex: 1,
    //width: '100%',
    backgroundColor: 'gray',
    //flexDirection: 'column',
  },
  bottomBox: {
    //height: 50
  },
});

export default CamerasPortrait;
