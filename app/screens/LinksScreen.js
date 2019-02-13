<<<<<<< HEAD
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
=======
import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
// import { ExpoLinksView } from "@expo/samples";
>>>>>>> hopefully fixed everything

export default class LinksScreen extends React.Component {
  // static navigationOptions = {
  //   title: "Links"
  // };

  render() {
<<<<<<< HEAD
    return (
      <ScrollView contentContainerStyle={styles.container}>
          <Text>
              This is the LinksScreen
          </Text>
      </ScrollView>
    );
  }
}

=======
    return <Text>Linkscreen</Text>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  }
});
>>>>>>> hopefully fixed everything
