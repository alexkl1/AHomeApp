/**
 * Home screen sensors display
 */
import React from 'react';
import {View} from 'react-native';
import NoSensors from './NoSensors';
import {useGetSensorsQuery} from '../../../api/apiService';
import {TempSensorElement} from './TempSensorElement';

const HomeSensors = () => {
  const {data} = useGetSensorsQuery(null, {pollingInterval: 5000});
  //console.log('HomeSensors ', data);

  return (
    <View>
      {data !== undefined && data?.length > 0 ? (
        data.map(i => <TempSensorElement key={'ksens_' + i?.id} data={i} />)
      ) : (
        <NoSensors />
      )}
    </View>
  );
};

//const styles = StyleSheet.create({});

export default HomeSensors;
