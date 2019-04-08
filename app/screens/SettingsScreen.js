import React from "react";
import { Text, View, TouchableHighlight,Linking } from "react-native";
import SettingsList from "react-native-settings-list";
import firebase from "firebase";
import { db } from "../config/db.js";
import { connect } from "react-redux";

import styles from "./style";

export class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: "Settings"
  };
  constructor() {
    super();
    this.onValueChange = this.onValueChange.bind(this);
    this.state = { switchValue: false };
  }

  logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.props.navigation.navigate("Login");
      });
  };

  render() {
    return (
      <View style={{ backgroundColor: "lightblue", flex: 1 }}>
        <View style={{ flex: 1, marginTop: 15 }}>
          <SettingsList>
            {/*Inserts a header text called "My Account" */}
            <SettingsList.Header
              headerText={
                this.props.user.account.accountInfo.name + "'s Account"
              }
              headerStyle={{ color: "white" }}
            />
            {/*Inserts a button that displays user's account info */}
            <SettingsList.Item title="Account Info" />

            {/*Inserts a header text called "My Account" */}
            <SettingsList.Header
              headerText="Notifications"
              headerStyle={{ color: "white", marginTop: 15 }}
            />

            {/*Inserts toggle switch called "Push Notifications" */}
            <SettingsList.Item
              hasNavArrow={false}
              switchState={this.state.switchValue}
              switchOnValueChange={this.onValueChange}
              hasSwitch={true}
              title="Push Notifications"
            />
            <SettingsList.Header
              headerText="Contact Us"
              headerStyle={{ color: "white", marginTop: 15 }}
            />
            <SettingsList.Item title="Contact Us"
            onPress={()=>{Linking.openURL('https://github.com/rgabeflores/OnTime')}}
            />
            <SettingsList.Header
              headerText="Logout"
              headerStyle={{ color: "white", marginTop: 15 }}
            />
            <SettingsList.Item onPress={this.logout} title="Logout" />
          </SettingsList>
        </View>
      </View>
    );
  }

  onValueChange(value) {
    this.setState({ switchValue: value });
  }
}

// create map of "store" object passed from Provider to this component's props
const mapStateToProps = store => {
  return {
    user: store.user.user // store.user == reducer, store.user.user == reducer.state.user
  };
};

// create map of "dispatch" object passed from Provider to this component's props
// const mapDispatchToProps = (dispatch) => {
//   return {
//     dispatch
//   }
// }

// connect() applies maps to component's props
export default connect(mapStateToProps)(SettingsScreen);
