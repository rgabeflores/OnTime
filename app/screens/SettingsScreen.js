import React from 'react';
import {
  Text,
  View
} from 'react-native';
import SettingsList from 'react-native-settings-list';

import styles from './style';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };
  constructor(){
  super();
  this.onValueChange = this.onValueChange.bind(this);
  this.state = {switchValue: false};
  }

  render() {
    return (
      <View style={{backgroundColor:'lightblue',flex:1}}>
        <View style={{flex:1, marginTop:15}}>
          <SettingsList>

            {/*Inserts a header text called "My Account" */}
          	<SettingsList.Header headerText='My Account' headerStyle={{color:'white'}}/>
            {/*Inserts a button that displays user's account info */}
            <SettingsList.Item title='Account Info'/>

            {/*Inserts a header text called "My Account" */}
            <SettingsList.Header headerText='Notifications' headerStyle={{color:'white', marginTop:15}}/>

            {/*Inserts toggle switch called "Push Notifications" */}
            <SettingsList.Item
              hasNavArrow={false}
              switchState={this.state.switchValue}
              switchOnValueChange={this.onValueChange}
              hasSwitch={true}
              title='Push Notifications'/>

          </SettingsList>
        </View>
      </View>


        );
  }
  onValueChange(value){
  this.setState({switchValue: value});
  }
}
