import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useTheme} from '@rneui/themed';
import {useGetSnapshotQuery} from '../../../api/apiService';
import {Image} from 'react-native';
import {
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {ScreenProps} from '../../../screens/HomeScreen';

const RNFS = require('react-native-fs');

type Props = {
  data: {id: string; snapshotUrl: string};
};
const CameraSlide = ({data}: Props) => {
  const theme = useTheme();
  const isFocused = useIsFocused();
  const navigation = useNavigation<ScreenProps>();
  const {} = useGetSnapshotQuery(
    {id: data?.id},
    isFocused
      ? {
          pollingInterval: 2000,
        }
      : {},
  );

  const onSwitchCameraScreen = (id: string): void => {
    console.log('Navigate camera screen ', id);
    // @ts-ignore
    navigation.navigate('Cameras', {activeCameraId: id});
  };

  const styles = StyleSheet.create({
    viewBox: {
      width: 100,
      height: 100,
      borderColor: theme.theme.colors.black,
      borderWidth: 1,
      marginRight: 5,
    },
    image: {width: 100, height: 100},
  });
  const fname = RNFS.DocumentDirectoryPath + `/cam_${data.id}.jpg`;
  //console.log('Slide render ', isFocused);
  const key = 'img_' + fname + Date.now().toString();
  return (
    <View style={styles.viewBox}>
      <TouchableOpacity onPress={() => onSwitchCameraScreen(data.id)}>
        <Image
          key={key}
          style={styles.image}
          source={{
            uri: 'file://' + fname,
            scale: 1,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CameraSlide;
