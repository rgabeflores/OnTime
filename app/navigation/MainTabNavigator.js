import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createMaterialTopTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import TasksScreen from "../screens/TasksScreen";
import TimerScreen from "../screens/TimerScreen";
import StatisticsScreen from "../screens/StatisticsScreen";

const HomeStack = createStackNavigator({
  Home: HomeScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-calendar${focused ? "" : "-outline"}`
          : "md-calendar"
      }
    />
  )
};

//Task Screen
const TasksStack = createStackNavigator({
  Tasks: TasksScreen
});

TasksStack.navigationOptions = {
  tabBarLabel: "Tasks",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios" ? "ios-checkbox-outline" : "md-checkbox-outline"
      }
    />
  )
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen
});

SettingsStack.navigationOptions = {
  tabBarLabel: "Settings",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-settings" : "md-settings"}
    />
  )
};

const TimerStack = createStackNavigator({
  Timer: TimerScreen
});
TimerStack.navigationOptions = {
  tabBarLabel: "Timer",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-timer" : "md-timer"}
    />
  )
};

const StatisticsStack = createStackNavigator({
  Timer: StatisticsScreen
});
StatisticsStack.navigationOptions = {
  tabBarLabel: "Statistics",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-podium" : "md-podium"}
    />
  )
};
export default createMaterialTopTabNavigator(
  {
    HomeStack,
    TasksStack,
    TimerStack,
    StatisticsStack,
    SettingsStack
  },
  {
    swipeEnabled: true,
    tabBarPosition: "bottom",
    tabBarOptions: {
      showLabel: true,
      showIcon: true,
      inactiveTintColor: "grey",
      activeTintColor: "lightblue",
      indicatorStyle: {
        backgroundColor: "#2f95dc",
        paddingVertical: 2
      },
      style: {
        backgroundColor: "white",
        paddingVertical: 10,
        borderTopWidth: 0.5,
        borderTopColor: "lightgrey"
      },
      tabStyle: {
        marginTop: Platform.OS == "ios" ? 0 : 0,
        height: 40
      },
      iconStyle: {
        width: 20,
        height: 20
      },
      labelStyle: {
        fontSize: 6
      }
    }
  }
);
