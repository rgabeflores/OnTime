import React from "react";
import { Provider } from "react-redux";
import { createRootNavigator } from "./navigation/router";
import store from "./redux/store";
import ignoreWarnings from "react-native-ignore-warnings";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: true // Need to implement an authentication token to prevent frequent logins
    };
  }
  render() {
    const Layout = createRootNavigator(this.state.isLoggedIn);
    return <Provider store={store}><Layout /></Provider>;
  }
}

ignoreWarnings("Setting a timer");
