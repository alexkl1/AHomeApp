import React from 'react';
import useTranslations from '../../../hooks/useTranslations';
import {Text} from '@rneui/themed';
import {View} from 'react-native';

const NoCameras = ({}) => {
  const T = useTranslations();
  return (
    <View>
      <Text h4>{T.Cameras_No}</Text>
      <Text>{T.Cameras_configure}</Text>
    </View>
  );
};

export default NoCameras;
