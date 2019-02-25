import React from "react";
import{
    AppRegistry,
    Text,
    View,
    StatusBar
} from 'react-native';
import styles from './style';
export default class Toolbar extends React.Component {
  render() {
    return (
     <View>
         <StatusBar
            backgroundColor = "lightblue"
            barStyle = "light-content"
         />
         <View style = {styles.navbar}>
          <Text style = {styles.navbarTitle}>
            {this.props.title}
          </Text>
         </View>
     </View>
    );
  }
}
AppRegistry.registerComponent('Toolbar', () => Toolbar)
