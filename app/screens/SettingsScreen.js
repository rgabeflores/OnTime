import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  Alert
} from 'react-native';

import styles from './style';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'app.json',
  };

  render() {

    return (
        <View>
            <Text>Settings Screen</Text>
        </View>

        );
  }
}
