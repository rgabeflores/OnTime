import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TextInput} from 'react-native';
import { LoggedOut, LoggedIn, createRootNavigator } from './navigation/router';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false // Need to implement authentication token to prevent frequent logins
    };
  }
  render() {
    const Layout = createRootNavigator(this.state.isLoggedIn);
    return <Layout />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
