import { createStackNavigator, createBottomTabNavigator, createAppContainer } from "react-navigation";

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';

/*
    Used to control routing for the app
*/

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

export const HomeNavigator = createBottomTabNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions:{
            title: "Home"
        }
    }
  /*
  */
});

export const LoggedOut = createAppContainer(LoginNavigator);
export const LoggedIn = createAppContainer(HomeNavigator);
