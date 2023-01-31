import React from 'react';
import {Button, Overlay, Text} from '@rneui/themed';
import {StyleSheet, View} from 'react-native';

type props = {
  /**
   * OK press handler
   */
  onDismiss: () => unknown;
  /** visibility flag **/
  isVisible: boolean;
  text: string;
};

const ErrorOverlay = ({onDismiss, isVisible, text}: props) => {
  return (
    <Overlay isVisible={isVisible} onBackdropPress={onDismiss}>
      <View style={styles.innerBox}>
        <Text style={styles.textPrimary}>Error</Text>
        <Text style={styles.textSecondary}>{text}</Text>
        <View style={styles.btn}>
          <Button title="OK" onPress={onDismiss} />
        </View>
      </View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 10,
  },
  innerBox: {
    minWidth: '70%',
    paddingHorizontal: 30,
    paddingBottom: 10,
  },
  btn: {
    marginTop: 30,
  },
  textPrimary: {
    marginVertical: 20,
    textAlign: 'center',
    fontSize: 20,
  },
  textSecondary: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 17,
  },
});

export default ErrorOverlay;
