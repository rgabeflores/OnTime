import React from 'react';
import {
  Text,
  View
} from 'react-native';

import styles from './style';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };

  render() {

    return (
        <View>
            <Text>Settings Screen</Text>
        </View>

        );
  }
}
