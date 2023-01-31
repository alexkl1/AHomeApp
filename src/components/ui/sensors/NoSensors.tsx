import React from 'react';
import useTranslations from '../../../hooks/useTranslations';
import {Text} from '@rneui/themed';

const NoSensors = ({}) => {
  const T = useTranslations();
  return <Text h4>{T.Sensors_No}</Text>;
};

export default NoSensors;
