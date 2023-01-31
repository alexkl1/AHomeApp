import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
// @ts-ignore
import {ImageZoom} from '@likashefqet/react-native-image-zoom';
import RNFS from 'react-native-fs';

type Props = {
  cameraId: string;
  onClick: () => void;
};
const FullScreenCamera = ({cameraId, onClick}: Props) => {
  const fname = RNFS.DocumentDirectoryPath + `/cam_${cameraId}.jpg`;
  return (
    <TouchableOpacity onPress={onClick}>
      <View style={styles.fullScreen}>
        <ImageZoom uri={fname} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fullScreen: {width: '100%', height: '100%'},
});

export default FullScreenCamera;
