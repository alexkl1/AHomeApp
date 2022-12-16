/**
 * Home screen cameras display
 */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '@rneui/themed';
import useTranslations from '../../../hooks/useTranslations';
import {useSelector} from 'react-redux';
import NoCameras from './NoCameras';

type RootState = {
  sensors: [] | null;
};

const HomeCameras = () => {
  //const T = useTranslations();
  const sensors = useSelector((state: RootState) => state?.sensors);

  return (
    <View>
      {sensors !== null && sensors?.length > 0 ? (
        <Text>cameras....</Text>
      ) : (
        <NoCameras />
      )}
    </View>
  );
};

//const styles = StyleSheet.create({});

export default HomeCameras;
