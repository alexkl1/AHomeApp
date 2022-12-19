import React from 'react';
import {Button, Icon, Overlay, Text} from '@rneui/themed';
import {StyleSheet} from 'react-native';

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
      <Text style={styles.textPrimary}>Error</Text>
      <Text style={styles.textSecondary}>{text}</Text>
      <Button
        icon={
          <Icon
            name="wrench"
            type="font-awesome"
            color="white"
            size={25}
            iconStyle={{marginRight: 10}}
          />
        }
        title="OK"
        onPress={onDismiss}
      />
    </Overlay>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 10,
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
