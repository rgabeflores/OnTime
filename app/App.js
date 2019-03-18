import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import ignoreWarnings from "react-native-ignore-warnings";

import Layout from './Layout';

/**
 * This class is the root of the application. It connects Redux to the layout of the app.
 */
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: true // Need to implement an authentication token to prevent frequent logins
    };
  }
  render() {
    return <Provider store={store}><Layout /></Provider>;
  }
}

ignoreWarnings("Setting a timer");
