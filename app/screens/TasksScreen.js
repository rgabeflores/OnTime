import React from "react";

import {
  AppRegistry,
  Text,
  View,
  ListView,
  TouchableHighlight,
  ScrollView,
  TextInput,
  Modal
} from "react-native";

import { connect } from "react-redux";

import Toolbar from "../components/Toolbar";
import styles from "../components/style";
import otherStyles from "./style"
import { db } from '../config/db';
import firebase from 'firebase';
export class TasksScreen extends React.Component {
  static navigationOptions = {
    title: "Tasks"
  };
  // constructor of the class, this stores the data(what it displays) for TaskScreen
  constructor() {
    super();
    // the datasource(ds) is a listener checking if the data has been changed or not
    let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      modalVisible: false,
      taskDataSource: ds,
      tasks: [
      ],
      title: "",
      hours: "",
      address: "",
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
    var userRef = db.ref("/tasks/" + this.props.user.uid);

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
        }}>
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
  // when the task is pressed, make a popup asking if the user wants to remove the task
  pressRow(task) {

  }
  render() {
    if (__DEV__) console.log(this.props.user);
    // the first if does not seem to be useful
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
          <Modal
            animationType="slide"
            visible={this.state.modalVisible}
          >
            <View style={otherStyles.container}>
              <TextInput
                clearButtonMode="always"
                style={otherStyles.textInputContainerTask}
                placeholder="Task Title"
                onChangeText={(text) => this.setState({ title: text })}
              />
              <TextInput
                clearButtonMode="always"
                style={otherStyles.textInputContainerTask}
                placeholder="Task Hours"
                onChangeText={(text) => this.setState({ hours: text })}
              />
              <TextInput
                clearButtonMode="always"
                style={otherStyles.textInputContainerTask}
                placeholder="Task Address"
                onChangeText={(text) => this.setState({ address: text })}
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
                onPress={() => { this.setState({ modalVisible: false }) }}
                underlayColor="white"
              >
                <View style={otherStyles.button}>
                  <Text style={otherStyles.buttonText}>Cancel Adding</Text>
                </View>
              </TouchableHighlight>
            </View>
          </Modal>
          <View style={styles.container}>
            <Toolbar title="Task List" />
            <ListView
              dataSource={this.state.taskDataSource}
              renderRow={this.renderRow}
            />
            <TouchableHighlight
              style={otherStyles.buttonContainer}
              onPress={this.showAddTask}
              underlayColor="white"
            >
              <View style={otherStyles.button}>
                <Text style={otherStyles.buttonText}>Add a Task</Text>
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
  showAddTask = (e) => {
    this.setState((prevState) => ({
      modalVisible: true
    }));
  }
  addTask = (e) => {
    // user's database reference
    var userRef = db.ref("/tasks/" + this.props.user.uid);
    if (this.state.title.length === 0) {
      alert("Title can not be empty!");
    } else {
      // update the database
      userRef.child(this.state.title).set({
        hours: this.state.hours,
        address: this.state.address
      })
      this.setState((prevState) => ({
        // clear the current inputs
        title: "",
        hours: "",
        address: "",
        // add a new set of tasks
        tasks: [...prevState.tasks, { title: this.state.title, hours: this.state.hours, address: this.state.address }],
        taskDataSource: this.state.taskDataSource.cloneWithRows(
          [...prevState.tasks, { title: this.state.title, hours: this.state.hours, address: this.state.address }]
        ),
        // remove the modal
        modalVisible: false
      }));
    }
  };
  removeTask = e => {

  };
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