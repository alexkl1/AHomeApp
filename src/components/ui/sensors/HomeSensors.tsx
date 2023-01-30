/**
 * Home screen sensors display
 */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import NoSensors from './NoSensors';
import {useGetSensorsQuery} from '../../../api/apiService';
import {TempSensorElement} from './TempSensorElement';
import useDeviceOrienation from '../../../hooks/useOrientation';

const HomeSensors = () => {
  const {data} = useGetSensorsQuery(null, {pollingInterval: 5000});
  //console.log('HomeSensors ', data);
  const orientation = useDeviceOrienation();

  // todo: implement sensor grid
  return (
    <View
      style={[
        orientation === 'portrait' && styles.portrait,
        orientation === 'landscape' && styles.landscape,
      ]}>
      {data !== undefined && data?.length > 0 ? (
        data.map(i => <TempSensorElement key={'ksens_' + i?.id} data={i} />)
      ) : (
        <NoSensors />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  portrait: {
    flexDirection: 'column',
  },
  landscape: {
    flexDirection: 'row',
  },
});

export default HomeSensors;
