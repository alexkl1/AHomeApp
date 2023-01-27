/**
 * Camera landscape swiper slide
 */
import React from 'react';
import {useIsFocused} from '@react-navigation/native';
import {useGetSnapshotQuery} from '../../../api/apiService';
import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import {Image} from 'react-native';
import RNFS from 'react-native-fs';

type Props = {
  // camera ID
  cameraId: string;
  onClick: () => void;
  width?: number;
  height?: number;
};

const CameraSwipeSlide = ({cameraId, width, height, onClick}: Props) => {
  const styles = StyleSheet.create({
    image: {
      width: width ?? '100%',
      resizeMode: 'contain',
      height: height ?? '100%',
    },
  });

  const isFocused = useIsFocused();
  const {} = useGetSnapshotQuery(
    {id: cameraId},
    isFocused
      ? {
          pollingInterval: 1500,
        }
      : {},
  );
  //console.log('Camera view render: ', cameraId);
  const fname = RNFS.DocumentDirectoryPath + `/cam_${cameraId}.jpg`;
  const key = 'img_' + fname + Date.now().toString();
  return (
    <View>
      <TouchableWithoutFeedback onPress={onClick}>
        <Image
          key={key}
          style={styles.image}
          source={{
            uri: 'file://' + fname,
            scale: 1,
          }}
        />
      </TouchableWithoutFeedback>
    </View>
  );
};

export default CameraSwipeSlide;
