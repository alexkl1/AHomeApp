/** generic application screen with paddings **/
import React, {PropsWithChildren} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '@rneui/themed';

type Props = PropsWithChildren & {
  noHPadding?: boolean; // disable horizontal padding
  noVPadding?: boolean; // disable vertical padding
  title?: string; // screen title
};

const makeStyleSheet = (props: Props) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      //backgroundColor: 'black',
      marginHorizontal: props?.noHPadding ? 0 : 5,
      marginVertical: props?.noVPadding ? 0 : 5,
    },
    title: {
      marginBottom: 5,
    },
  });
const AppScreen = (props: Props) => {
  const styles = makeStyleSheet(props);
  return (
    <View style={styles.screen}>
      {props?.title && (
        <View style={styles.title}>
          <Text h3>{props.title}</Text>
        </View>
      )}
      {props.children}
    </View>
  );
};

export default AppScreen;
