import React from "react";
import{
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Toolbar from '../components/Toolbar';
const styles = '../components/style'
export default class TasksScreen extends React.Component {

  render() {
    return(
        <View style = {styles.container}>
            <Toolbar title = "Task List">
            </Toolbar>
        </View>

    );
  }
}

AppRegistry.registerComponent('tasklister', () => tasklister);