/**
 * Settings screen
 */
import React from 'react';
import {Text} from '@rneui/themed';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import MainTabParams from '../navigation/MainTabParams';
import {ButtonGroup} from '@rneui/themed';
import {useDispatch, useSelector} from 'react-redux';
import localeTypes from '../i18n/localetypes';
import AppScreen from '../components/ui/AppScreen';
import {SWITCHLANGUAGE} from '../actions/actions';
import useTranslations from '../hooks/useTranslations';
import {StyleSheet, View} from 'react-native';
import {version} from '../../package.json';

type settingsState = {
  locale: localeTypes;
};

type indexMapperType = {
  [Property in localeTypes as string]: number;
};

type ScreenProps = BottomTabScreenProps<MainTabParams, 'Settings', 'Settings'>;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SettingsScreen = ({navigation, route}: ScreenProps) => {
  console.log('settings');
  console.log('test');

  const dispatch = useDispatch();
  const locale = useSelector((state: settingsState) => state?.locale ?? 'en');
  const localeButtonIndexMapper: indexMapperType = {en: 0, ru: 1};
  const localeSelectedIndex = localeButtonIndexMapper[locale];
  const T = useTranslations();

  const setLocale = (index: number) => {
    const newLocale = Object.keys(localeButtonIndexMapper).find(
      i => localeButtonIndexMapper[i] == index,
    );
    console.log(`Set new locale ${index} ${newLocale}`);
    dispatch({type: SWITCHLANGUAGE, payload: newLocale});
  };
  return (
    <AppScreen>
      <Text h1>{T.Screen_Settings}</Text>

      <View style={[styles.topMargin, styles.flex]}>
        <Text h4>{T.Language}</Text>
        <ButtonGroup
          buttons={['English', 'Русский']}
          selectedIndex={localeSelectedIndex}
          onPress={setLocale}
          containerStyle={{marginBottom: 20}}
        />
      </View>
      <View style={styles.bottomVer}>
        <Text>Ver: {version}</Text>
      </View>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  topMargin: {marginTop: 30},
  bottomVer: {alignSelf: 'flex-end', marginRight: 10},
  flex: {flex: 1},
});

export default SettingsScreen;
