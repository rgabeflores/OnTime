import React from "react";

import {
  AppRegistry,
  Text,
  View,
  ListView,
  TouchableHighlight
} from "react-native";

import { connect } from "react-redux";

import Toolbar from "../components/Toolbar";
import styles from "../components/style";

export class TasksScreen extends React.Component {
  static navigationOptions = {
    title: "Tasks"
  };
  // constructor of the class, this stores the data(what it displays) for TaskScreen
  constructor() {
    super();
    // the datasource(ds) is a listener checking if the data has been changed or not
    let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 });
    this.state = {
      taskDataSource: ds
    };
    this.renderRow = this.renderRow.bind(this);
    this.pressRow = this.pressRow.bind(this);
  }
  // call it before the component mounts, debugging
  componentWillMount() {
    this.getItems();
  }
  // get called
  componentDidMount() {
    this.getItems();
  }
  // get the items from the list view
  getItems() {
    // hardcode values
    // TODO: fetch data from firebase
    let tasks = [
      { title: "Task One", hours: "2", address: "Address 123" },
      { title: "Task Two", hours: "2", address: "456 Some Street" }
    ];
    // update the view
    this.setState({
      taskDataSource: this.state.taskDataSource.cloneWithRows(tasks)
    });
  }
  // display task
  renderRow(task) {
    return (
      <TouchableHighlight
        onPress={() => {
          this.pressRow(task);
        }}
      >
        <View style={styles.li}>
          <Text style={styles.liText}>
            Task Name: {task.title} {"\n"}
            Required Time: {task.hours} {"\n"}
            Location: {task.address}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
  // log the task that was tapped on (or do something else later)
  pressRow(task) {
    console.log(task);
  }
  render() {
    if(__DEV__) console.log(this.props.user);

    if (this.state.taskDataSource.getRowCount === 0) {
      return (
        <View style={styles.container}>
          <Text>loading....</Text>
        </View>
      );
    } else {
      // display the task list
      return (
        <View style={styles.container}>
          <Toolbar title="Task List" />
          <ListView
            dataSource={this.state.taskDataSource}
            renderRow={this.renderRow}
          />
        </View>
      );
    }
  }
}

// create map of "store" object passed from Provider to this component's props
const mapStateToProps = (store) => {
  return {
    user: store.user.user, // store.user == reducer, store.user.user == reducer.state.user
  }
};

// create map of "dispatch" object passed from Provider to this component's props
const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
}

// connect() applies maps to component's props
export default connect(mapStateToProps, mapDispatchToProps)(TasksScreen);