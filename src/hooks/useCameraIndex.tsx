import {Cameras} from '../api/apiTypes';

/**
 * Find index of given camera by string id value or return default first index
 * @param data
 * @param activeCameraId
 */
const useCameraIndex = (
  data: Cameras | undefined,
  activeCameraId: string | undefined,
): number => {
  if (data === undefined) {
    return 0;
  }
  return data.findIndex(i => i?.id === activeCameraId) ?? 0;
};

export default useCameraIndex;
