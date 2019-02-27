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
      <View style={{backgroundColor:'gray',flex:1}}>
      <View style={{flex:1, marginTop:20}}>
        <SettingsList>
        	<SettingsList.Header headerText='My Account' headerStyle={{color:'white'}}/>
          <SettingsList.Item title='Account Info'/>

          <SettingsList.Header headerText='Notifications' headerStyle={{color:'white', marginTop:20}}/>
          <SettingsList.Item
            hasNavArrow={false}
            switchState={this.state.switchValue}
            switchOnValueChange={this.onValueChange}
            hasSwitch={true}
            title='Switch Example'/>

        </SettingsList>
      </View>
    </View>


        );
  }
  onValueChange(value){
  this.setState({switchValue: value});
  }
}
