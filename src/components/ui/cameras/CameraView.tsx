/**
 * Full screen camera view component
 * Refresh using long pooling of screenshots from server
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
};

const CameraView = ({cameraId, onClick}: Props) => {
  const isFocused = useIsFocused();
  const {} = useGetSnapshotQuery(
    {id: cameraId},
    isFocused
      ? {
          pollingInterval: 1000,
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

const styles = StyleSheet.create({
  image: {width: '100%', resizeMode: 'contain', height: '100%'},
});

export default CameraView;
