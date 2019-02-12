import { createStackNavigator, createTabNavigator, createAppContainer } from "react-navigation";

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';

/*
    Used to control routing for the app
*/

export const AppNavigator = createStackNavigator({
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

export const HomeNavigator = createTabNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions:{
            title: "Home"
        }
    }
  /*
  */
});

export const LoggedOut = createAppContainer(AppNavigator);
export const LoggedIn = createAppContainer(HomeNavigator);
