import React from "react";
import {Text, View, TouchableHighlight,Linking } from "react-native";
import {Avatar} from "react-native-elements";
import SettingsList from "react-native-settings-list";
import firebase from "firebase";
import { db } from "../config/db.js";
import { connect } from "react-redux";

import { logoutUser } from "../redux/actions/userActions";

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
    // firebase
    //   .auth()
    //   .signOut()
    //   .then(() => {
        
    //     this.props.navigation.navigate("Login");
    //   });
  };

  render() {
    return (
      <View style={{ backgroundColor: "lightblue", flex: 1 }}>
        <View style={{ flex: 1, marginTop: 15 }}>
          <View style={{position: 'absolute', top: 0, left: 0, right: 0,
           bottom: 0, alignItems: 'center'}}>
            <Avatar
            size = "large"
            overlayContainerStyle={{backgroundColor: 'blue'}}
            rounded title={this.props.user.account.accountInfo.name[0]}
            />
            <Text style={{fontWeight:'bold',fontSize:22,padding:10}}>
            {this.props.user.account.accountInfo.name}</Text>
          </View>

          <SettingsList>
            <SettingsList.Header
              headerStyle={{ color: "white", marginTop: 95 }}
            />
            {/*Inserts a header text called "Notifications" */}
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
            <SettingsList.Item onPress={this.props.logoutUser.bind(this)} title="Logout" />
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
    isLoggedIn: store.user.isLoggedIn,
    user: store.user.user // store.user == reducer, store.user.user == reducer.state.user
  };
};

// create map of "dispatch" object passed from Provider to this component's props
const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => {
      dispatch(logoutUser());
    },
  }
}

// connect() applies maps to component's props
export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
