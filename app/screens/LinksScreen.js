import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  TouchableHighlight,
  Alert
} from 'react-native';

import styles from './style';

import firebase from 'firebase';
import { db } from '../config/db';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
          <Text>
              This is the LinksScreen
          </Text>
      </ScrollView>
    );
  }
}

