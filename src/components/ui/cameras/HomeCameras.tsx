/**
 * Home screen cameras display
 */
import React from 'react';
import {View} from 'react-native';
import NoCameras from './NoCameras';
import {useGetCamerasQuery} from '../../../api/apiService';
import CameraSlider from './CameraSlider';

const HomeCameras = () => {
  //const T = useTranslations();
  //const sensors = useSelector((state: RootState) => state?.sensors);
  const {data} = useGetCamerasQuery(null);
  console.log('Camdata = ', data);

  return (
    <View>
      {data && data?.length > 0 ? <CameraSlider data={data} /> : <NoCameras />}
    </View>
  );
};

//const styles = StyleSheet.create({});

export default HomeCameras;
