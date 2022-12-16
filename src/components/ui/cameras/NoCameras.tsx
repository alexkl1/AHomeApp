import React from 'react';
import useTranslations from '../../../hooks/useTranslations';
import {Text} from '@rneui/themed';

const NoCameras = ({}) => {
  const T = useTranslations();
  return <Text h4>{T.Cameras_No}</Text>;
};

export default NoCameras;
