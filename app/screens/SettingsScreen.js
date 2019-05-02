import React from "react";
import { Text, View, Linking, Alert } from "react-native";
import { Avatar } from "react-native-elements";
import SettingsList from "react-native-settings-list";

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
  AsyncAlert() {
    return new Promise((resolve, reject) => {
      Alert.alert(
        'Logout',
        'Are you sure you want to logout?',
        [
          { text: "Logout", onPress: () => (this.props.logoutUser()) },
          { text: "Cancel", style: 'cancel', onPress: () => (resolve(1)) }
        ],
        { cancelable: false }
      )
    })
  }

  logout() {
    return this.AsyncAlert()
  };

  render() {
    return (
      <View>
        <View style={styles.settingsHeader}>
          <View style={styles.settingsAvatarContainer}>
            <Avatar
              size={"large"}
              overlayContainerStyle={{ backgroundColor: '#00adf5'}}
              rounded
              title={this.props.user.account.accountInfo.name[0]}
            />
          </View>
          <Text style={styles.smallTitle}>
            {this.props.user.account.accountInfo.name}
          </Text>
        </View>
        <View style={{ height: "65%" }}>
          <SettingsList
            borderColor={"lightgrey"}
            backgroundColor={"white"}
            underlayColor={"#00adf5"}
            defaultItemSize={100}
            defaultTitleStyle={styles.settingsRowText}
          >
            <SettingsList.Item
              title="Push Notifications"
              hasSwitch={true}
              switchState={this.state.switchValue}
              switchOnValueChange={this.onValueChange}
              switchProps={{ trackColor: { false: "lightgrey", true: "#00adf5" } }}
              hasNavArrow={false}
            />
            <SettingsList.Item
              title="Contact Us"
              onPress={() => { Linking.openURL('https://github.com/rgabeflores/OnTime') }}
            />
            <SettingsList.Item
              title="Logout"
              onPress={this.logout.bind(this)}
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
