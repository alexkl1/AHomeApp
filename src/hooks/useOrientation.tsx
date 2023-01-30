/**
 * Detect device orientation hook
 *
 */

import {useWindowDimensions} from 'react-native';

type DECIVEORIENTATION = 'portrait' | 'landscape';

const useDeviceOrienation = (): DECIVEORIENTATION => {
  const {width, height} = useWindowDimensions();
  const isLandscape = width > height;

  return isLandscape ? 'landscape' : 'portrait';
};

export default useDeviceOrienation;
