/**
 * Settings screen
 */
import React from 'react';
import {Button, ButtonGroup, Text} from '@rneui/themed';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import MainTabParams from '../navigation/MainTabParams';
import {useDispatch, useSelector} from 'react-redux';
import localeTypes from '../i18n/localetypes';
import AppScreen from '../components/ui/AppScreen';
import useTranslations from '../hooks/useTranslations';
import {StyleSheet, View} from 'react-native';
import {version} from '../../package.json';
import {RootState} from '../store/configureStore';
import {logout, switchLanguage} from '../reducers/appReducer';
import {util} from '../api/apiService';

type indexMapperType = {
  [Property in localeTypes as string]: number;
};

type ScreenProps = BottomTabScreenProps<MainTabParams, 'Settings', 'Settings'>;

const SettingsScreen = ({}: ScreenProps) => {
  const dispatch = useDispatch();
  const locale = useSelector((state: RootState) => state?.app.locale ?? 'en');
  const localeButtonIndexMapper: indexMapperType = {en: 0, ru: 1};
  const localeSelectedIndex = localeButtonIndexMapper[locale];
  const T = useTranslations();

  const setLocale = (index: number) => {
    const newLocale =
      Object.keys(localeButtonIndexMapper).find(
        i => localeButtonIndexMapper[i] === index,
      ) ?? 'en';
    console.log(`Set new locale ${index} ${newLocale}`);
    dispatch(switchLanguage(newLocale));
  };
  const onLogout = () => {
    dispatch(logout());
    console.log('Reset api state');
    util.resetApiState();
  };
  return (
    <AppScreen title={T.Screen_Settings}>
      <View style={[styles.topMargin]}>
        <Text h4>{T.Language}</Text>
        <ButtonGroup
          buttons={['English', 'Русский']}
          selectedIndex={localeSelectedIndex}
          onPress={setLocale}
          containerStyle={styles.switchMargin}
        />
      </View>
      <View style={[styles.topMargin, styles.btn]}>
        <Button title="Logout" onPress={onLogout} />
      </View>
      <View style={styles.flex} />
      <View style={styles.bottomVer}>
        <Text>Ver: {version}</Text>
      </View>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  topMargin: {marginTop: 30},
  bottomVer: {alignSelf: 'flex-end', marginRight: 10},
  switchMargin: {marginBottom: 20},
  flex: {flex: 1},
  btn: {alignSelf: 'center', width: 150},
});

export default SettingsScreen;
