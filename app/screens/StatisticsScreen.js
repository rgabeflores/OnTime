import React from 'react';
import {
  Text,
  View
} from 'react-native';

import styles from './style';

export default class StatisticsScreen extends React.Component {
  static navigationOptions = {
    title: 'Statistics',
  };

  render(){
    return(
      <View>
        <Text>Statistics Screen</Text>
      </View>
    );
  }
}
