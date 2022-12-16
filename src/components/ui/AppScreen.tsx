/** generic application screen with paddings **/
import React, {PropsWithChildren} from 'react';
import {StyleSheet, View} from 'react-native';

type Props = PropsWithChildren & {
  noHPadding?: boolean | undefined; // disable horizontal padding
  noVPadding?: boolean | undefined; // disable vertical padding
};

const makeStyleSheet = (props: Props) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      marginHorizontal: props?.noHPadding ? 0 : 5,
      marginVertical: props?.noVPadding ? 0 : 5,
    },
  });
const AppScreen = (props: Props) => {
  const styles = makeStyleSheet(props);
  return <View style={styles.screen}>{props.children}</View>;
};

export default AppScreen;
