/**
 * Application login screen if not authenticated
 */
import React, {useEffect, useState} from 'react';
import {Button, Input, Text, useTheme} from '@rneui/themed';
//import {useDispatch} from 'react-redux';
import AppScreen from '../components/ui/AppScreen';
import useTranslations from '../hooks/useTranslations';
import {StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import RootStackParams from '../navigation/RootStackParams';
import ErrorOverlay from '../components/ui/ErrorOverlay';
import {useAuthMutation} from '../api/apiService';
import {selectCurrentToken} from '../reducers/appReducer';
import {useSelector} from 'react-redux';

type errorObject = {
  text: string;
} | null;

type ScreenProps = NativeStackScreenProps<RootStackParams, 'Login'>;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const LoginScreen = ({navigation, route}: ScreenProps) => {
  //console.log('login screen');
  const theme = useTheme();
  //const dispatch = useDispatch();
  const T = useTranslations();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [errorObject, setErrorObject] = useState<errorObject>(null);
  const [authUser, {isLoading, isSuccess, error, isError}] = useAuthMutation();
  const authToken = useSelector(selectCurrentToken);

  const onPress = () => {
    console.log('login');

    if (login?.length > 0 && password?.length > 0) {
      console.log('do login');
      authUser({login: login, password: password});
    } else {
      console.log('no login / password');
      setErrorObject({text: T.Error_fields});
    }
  };

  // redirect after login
  useEffect(() => {
    console.log('AuthToken effect');
    if (authToken && authToken.length > 0) {
      console.log('Got valid token. Navigate to main');
      navigation.navigate('Main');
    }
  }, [authToken, navigation]);

  const dismissError = () => setErrorObject(null);

  const styles = StyleSheet.create({
    topMargin: {marginTop: 30},
    box: {width: '90%', alignSelf: 'center'},
    bottomVer: {alignSelf: 'flex-end', marginRight: 10},
    vCenter: {justifyContent: 'center'},
    loginBox: {width: '80%', alignSelf: 'center'},
    buttonBox: {marginTop: 30, width: '80%', alignSelf: 'center'},
    errorBox: {alignSelf: 'center', marginTop: 10},
    errorText: {color: theme.theme.colors.error},
    flex: {flex: 1},

    title: {marginBottom: 15, alignSelf: 'center', width: '80%'},
  });

  return (
    <AppScreen>
      <ErrorOverlay
        onDismiss={dismissError}
        isVisible={errorObject !== null}
        text={errorObject?.text ?? ''}
      />
      <View style={[styles.vCenter, styles.flex]}>
        <View style={styles.box}>
          <View style={styles.title}>
            <Text>{T.Login_Text1}</Text>
          </View>

          <View style={styles.loginBox}>
            <Input
              onChangeText={setLogin}
              placeholder={T.Login}
              maxLength={15}
            />
            <Input
              onChangeText={setPassword}
              secureTextEntry={true}
              maxLength={15}
              placeholder={T.Password}
            />
          </View>
          <View style={styles.title}>
            <Text style={{color: theme.theme.colors.grey3}}>
              {T.Login_Text2}
            </Text>
          </View>

          <View style={styles.buttonBox}>
            <Button
              loading={isLoading}
              onPress={onPress}
              title={T.Button_Login}
            />
          </View>
          {isError && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>
                {error?.status} {JSON.stringify(error?.data)}
              </Text>
            </View>
          )}
        </View>
      </View>
    </AppScreen>
  );
};

export default LoginScreen;
