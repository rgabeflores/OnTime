import React from "react";
import { Text, View, TouchableHighlight,Linking, Alert, Switch } from "react-native";
import { Avatar } from "react-native-elements";
import SettingsList from "react-native-settings-list";
import firebase from "firebase";
import { db } from "../config/db.js";
import { connect } from "react-redux";

import { logoutUser } from "../redux/actions/userActions";

import SettingsRow from './components/SettingsRow';

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
    // Alert.alert(
    //   'Alert Title',
    //   'My Alert Msg',
    //   [
    //     {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
    //     {
    //       text: 'Cancel',
    //       onPress: () => console.log('Cancel Pressed'),
    //       style: 'cancel',
    //     },
    //     {text: 'OK', onPress: () => console.log('OK Pressed')},
    //   ],
    //   {cancelable: false},
    // );

    this.props.logoutUser();
  };

  render() {
    return (
      <View>
          <View style={ styles.settingsHeader }>
            <Avatar
              size={"large"}
              overlayContainerStyle={{ backgroundColor: '#00adf5'}}
              rounded
              title={this.props.user.account.accountInfo.name[0]}
            />
            <Text style={styles.smallTitle}>
              {this.props.user.account.accountInfo.name}
            </Text>
          </View>
          <View style={{ height: "65%" }}>
            {/* <SettingsRow 
              title={"Push Notifications"}
              isSwitch
              action={this.onValueChange.bind(this)}
              value={this.state.switchValue}
            />
            <SettingsRow 
              title={"Contact Us"}
              action={()=>{Linking.openURL('https://github.com/rgabeflores/OnTime')}}
            />
            <SettingsRow 
              title={"Logout"}
              action={this.logout.bind(this)}
            /> */}

            <SettingsList
              backgroundColor={"white"}
              defaultItemSize={100}
              >
                <SettingsList.Item
                  hasNavArrow={false}
                  switchState={this.state.switchValue}
                  switchOnValueChange={this.onValueChange}
                  hasSwitch={true}
                  switchProps={{ trackColor: {false: "lightgrey", true: "#00adf5"} }}
                  title="Push Notifications"
                />
                <SettingsList.Item
                  title="Contact Us"
                  onPress={()=>{Linking.openURL('https://github.com/rgabeflores/OnTime')}}
                />
                <SettingsList.Item 
                  onPress={this.logout.bind(this)}
                  title="Logout"
                />
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
