import React from "react";

import {
  AppRegistry,
  Text,
  View,
  ListView,
  TouchableHighlight,
  ScrollView
} from "react-native";

import Toolbar from "../components/Toolbar";
import styles from "../components/style";
import otherStyles from "./style"
import { db } from '../config/db';
import firebase from 'firebase';
let uID = 'vs5zAcoqmdYatVWRL6yARSuSiz22';
export default class TasksScreen extends React.Component {
  static navigationOptions = {
    title: "Tasks"
  };
  // constructor of the class, this stores the data(what it displays) for TaskScreen
  constructor() {
    super();
    // the datasource(ds) is a listener checking if the data has been changed or not
    let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 });
    this.state = {
      taskDataSource: ds,
      tasks: [
        { title: "Task One", hours: "2", address: "Address 123" },
        { title: "Task Two", hours: "2", address: "456 Some Street" }
      ]
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
    var userRef = db.ref("/tasks/" + uID);

    // hardcode values
    // TODO: fetch data from firebase

    // store each tasks to the database
    // the key is the task name
    this.state.tasks.forEach(element => {
      userRef.child(element.title).set({
        hours: element.hours,
        address: element.address
      })
    });

    userRef.once("value")
      .then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {

          var taskName = childSnapshot.key; // "task name"
          var hoursNeeded = childSnapshot.val();
          console.log(taskName);
          console.log(hoursNeeded);
          this.state.tasks.push({
            title: taskName,
            hours: hoursNeeded,
            address: addressGiven
          })

        })
      });

    // update the view
    this.setState({
      taskDataSource: this.state.taskDataSource.cloneWithRows(this.state.tasks)
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
    if (this.state.taskDataSource.getRowCount === 0) {
      return (
        <View style={styles.container}>
          <Text>loading....</Text>
        </View>
      );
    } else {
      // display the task list
      return (
        <ScrollView>
          <View style={styles.container}>
            <Toolbar title="Task List" />
            <ListView
              dataSource={this.state.taskDataSource}
              renderRow={this.renderRow}
            />
            <TouchableHighlight
              style={otherStyles.buttonContainer}
              onPress={this.addTask.bind(this)}
              underlayColor="white"
            >
              <View style={otherStyles.button}>
                <Text style={otherStyles.buttonText}>Add Task</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              style={otherStyles.buttonContainer}
              onPress={this.removeTask.bind(this)}
              underlayColor="white"
            >
              <View style={otherStyles.button}>
                <Text style={otherStyles.buttonText}>Remove Task</Text>
              </View>
            </TouchableHighlight>
          </View>
        </ScrollView>
      );
    }
  }
  addTask = (e) => {
    this.setState((prevState) => ({
      // add a new set of tasks
      tasks: [...prevState.tasks, { title: "Task Three", hours: "2", address: "456 Some Street heh" }],
      // update the view
      taskDataSource: this.state.taskDataSource.cloneWithRows(this.state.tasks)
    }));
    // store each tasks to the database
    // the key is the task name
    this.state.tasks.forEach(element => {
      userRef.child(element.title).set({
        hours: element.hours,
        address: element.address
      })
    });
    console.log(this.state.tasks);
  };
  removeTask = e => {

  };
}

AppRegistry.registerComponent("tasklister", () => tasklister);
