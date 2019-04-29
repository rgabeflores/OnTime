import React from "react";
import {
  Text,
  View,
  TouchableHighlight,
  Linking,
  Modal,
  TextInput
} from "react-native";
import { Avatar } from "react-native-elements";
import SettingsList from "react-native-settings-list";
import firebase from "firebase";
import { setUserName } from "../redux/actions/userActions";
import { db } from "../config/db.js";
import { connect } from "react-redux";
import AccountInfo from "./HomeScreen";

import styles from "./style";

export class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: "Settings"
  };
  constructor() {
    super();
    this.onValueChange = this.onValueChange.bind(this);
    this.state = {
      switchValue: false,
      accountInfo: false,
      name: "",
      email: ""
    };
  }

  logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.props.navigation.navigate("Login");
      });
  };

  closeModal = () => {
    this.setState({ accountInfo: false });
  };

  openModal = () => {
    this.setState({ accountInfo: true });
  };

  handleInput = () => {
    this.props.setUserName(this.props.user.uid, this.state.name);
    this.closeModal();
  };
  render() {
    return (
      <View style={{ backgroundColor: "lightblue", flex: 1 }}>
        <View style={{ flex: 1, marginTop: 15 }}>
          <TouchableHighlight onPress={this.openModal.bind(this)}>
            <Text style={{ fontSize: 25, color: "blue" }}>Edit profile</Text>
          </TouchableHighlight>
          <Modal
            animationType="slide"
            visible={this.state.accountInfo}
            enableEmptySections={true}
            onBackButtonPress={this.closeModal.bind(this)}
            onRequestClose={this.closeModal.bind(this)}
          >
            <View>
              <SettingsList>
                {/*Inserts a header text called "Notifications" */}
                <SettingsList.Header
                  headerText="Name"
                  headerStyle={{ color: "grey", marginTop: 15 }}
                />
                <TextInput
                  clearButtonMode="always"
                  placeholder={this.props.user.account.accountInfo.name}
                  onChangeText={text => this.setState({ name: text })}
                  style={{}}
                />
              </SettingsList>
              <View style={{ flexDirection: "row" }}>
                <TouchableHighlight onPress={this.closeModal.bind(this)}>
                  <Text style={{ fontSize: 25, color: "blue" }}>Cancel</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.handleInput}>
                  <Text style={{ fontSize: 25 }}>Save</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              alignItems: "center"
            }}
          >
            <Avatar
              size="large"
              overlayContainerStyle={{ backgroundColor: "blue" }}
              rounded
              title={this.props.user.account.accountInfo.name[1]}
            />
            <Text style={{ fontWeight: "bold", fontSize: 22, padding: 10 }}>
              {this.props.user.account.accountInfo.name}
            </Text>
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
            <SettingsList.Item
              title="Contact Us"
              onPress={() => {
                Linking.openURL("https://github.com/rgabeflores/OnTime");
              }}
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

const mapDispatchToProps = dispatch => {
  return {
    setUserName: (uid, name) => {
      dispatch(setUserName(uid, name));
    }
  };
};

// create map of "dispatch" object passed from Provider to this component's props
// const mapDispatchToProps = (dispatch) => {
//   return {
//     dispatch
//   }
// }

// connect() applies maps to component's props
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsScreen);
