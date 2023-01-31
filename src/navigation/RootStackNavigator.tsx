import React, {useEffect} from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import RootStackParams from './RootStackParams';
import MainTabNavigator from './MainTabNavigator';
import {useSelector} from 'react-redux';
import {RootState} from '../store/configureStore';
import InitialSetupScreen from '../screens/InitialSetupScreen';
import LoginScreen from '../screens/LoginScreen';
import usePrevious from '../hooks/usePrevious';
import {useNavigation} from '@react-navigation/native';

const Stack = createNativeStackNavigator<RootStackParams>();

type NavigationProp = NativeStackNavigationProp<RootStackParams>;

const RootStackNavigator = () => {
  const authToken = useSelector((state: RootState) => state?.app.authToken);
  const prevToken = usePrevious(authToken);
  const navigation = useNavigation<NavigationProp>();

  // detect first screen
  const firstScreen = authToken ? 'Main' : 'Login';
  console.log(`Initial screen = ${firstScreen}`);

  // navigate on login screen after logout
  useEffect(() => {
    console.log('AuthToken effect');
    if (prevToken && !authToken) {
      console.log('Reset navigation: ', navigation);

      navigation.navigate('Login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authToken]);

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={firstScreen}>
      <Stack.Screen name="InitialSetup" component={InitialSetupScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Main" component={MainTabNavigator} />
    </Stack.Navigator>
  );
};

export default RootStackNavigator;
