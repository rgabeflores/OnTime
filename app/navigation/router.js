import React from "react";
import { createStackNavigator, createBottomTabNavigator, createSwitchNavigator, createAppContainer } from "react-navigation";

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';

import AppNavigator from './AppNavigator';
import MainTabNavigator from './MainTabNavigator';

/*
    ======== This file is used for the App's routing =================
*/

export const createRootNavigator = (loggedIn = false) => {
  return createAppContainer(createSwitchNavigator(
    {
      LoggedIn: {
        screen: LoggedIn
      },
      LoggedOut: {
        screen: LoggedOut
      }
    },
    {
      initialRouteName: loggedIn ? "LoggedIn" : "LoggedOut"
    }
  ));
};
export const LoginNavigator = createStackNavigator({
  Register: {
    screen: RegisterScreen,
    navigationOptions:{
        title: "Register"
    }
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      title: "Login"
    }
  }
  /*
  */
});

export const HomeNavigator = createSwitchNavigator({
  Main: MainTabNavigator,
});

export const LoggedOut = createAppContainer(LoginNavigator);
export const LoggedIn = createAppContainer(HomeNavigator);
