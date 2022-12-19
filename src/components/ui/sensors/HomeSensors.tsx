/**
 * Home screen sensors display
 */
import React from 'react';
import {View} from 'react-native';
import {Text} from '@rneui/themed';
import {useSelector} from 'react-redux';
import NoSensors from './NoSensors';

type RootState = {
  sensors: [] | null;
};

const HomeSensors = () => {
  //const T = useTranslations();
  const sensors = useSelector((state: RootState) => state?.sensors);

  return (
    <View>
      {sensors !== null && sensors?.length > 0 ? (
        <Text>sensors....</Text>
      ) : (
        <NoSensors />
      )}
    </View>
  );
};

//const styles = StyleSheet.create({});

export default HomeSensors;
