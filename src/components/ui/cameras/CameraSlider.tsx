/**
 * Small Horizontal cameras list with realtime update.
 */
import {Cameras} from '../../../api/apiTypes';
import React from 'react';
import CameraSlide from './CameraSlide';
import {StyleSheet, View} from 'react-native';

type Props = {
  data: Cameras;
};
const CameraSlider = ({data}: Props) => {
  if (data && data?.length > 0) {
    const camComponents = data.map(i => <CameraSlide key={i?.id} data={i} />);
    return <View style={styles.viewBox}>{camComponents}</View>;
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  viewBox: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});

export default CameraSlider;
