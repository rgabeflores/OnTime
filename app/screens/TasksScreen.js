import React from "react";

import {
  AppRegistry,
  Text,
  View,
  ListView,
  TouchableHighlight,
  ScrollView,
  TextInput,
  Modal,
  Platform
} from "react-native";
import Icon from "../components/TabBarIcon";
import { connect } from "react-redux";
import { addTask } from "../redux/actions/userActions";

import Toolbar from "../components/Toolbar";
import styles from "../components/style";
import otherStyles from "./style";
import { db } from "../config/db";
import firebase from "firebase";

import TaskRow from "./components/TaskRow";


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
      deleteMode: false,
      modalVisible: false,
      taskDataSource: ds,
      tasks: [],
      title: "",
      hours: "",
      address: ""
    };
    
  }

  componentDidMount() {
    this.getItems();
  }
  // get the items from the list view
  getItems = async () => {
    console.log(this.props.user);
    var userRef = db.ref("Accounts/" + this.props.user.uid+"/tasks/");
    let data = [];
    userRef.once("value", snapshot => {
      snapshot.forEach(childSnapshot => {
        var taskName = childSnapshot.key; // "task name"
        var taskDetails = childSnapshot.val();
        var temp = {
          title: taskName,
          hours: taskDetails.hours,
          address: taskDetails.address
        };
        data.push(temp);
        return false;
      });
      console.log(data);
      this.setState({
        tasks: data,
        taskDataSource: this.state.taskDataSource.cloneWithRows(data)
      });
    });
    // update the view
  };
  
  // when the user presses the remove task button
  updateView(){
    this.setState({taskDataSource: this.state.taskDataSource.cloneWithRows(this.state.tasks)});
  }
  
  _closeModal() {
    setState({
      modalVisible: false
    });
  }

  showAddTask = e => {
    this.setState(prevState => ({
      modalVisible: true
    }));
  };
  showRemoveTask = e => {
    this.setState(prevState => ({
      deleteMode: !this.state.deleteMode
    }));
  };
  addTask = e => {
    // user's database reference
    var userRef = db.ref("/Accounts/" + this.props.user.uid + "/tasks/");
    if (this.state.title.length === 0) {
      alert("Title can not be empty!");
    } else {
      // update the database
      userRef.child(this.state.title).set({
        hours: this.state.hours,
        address: this.state.address
      });
      this.setState(prevState => ({
        // clear the current inputs
        title: "",
        hours: "",
        address: "",
        // add a new set of tasks
        tasks: [
          ...prevState.tasks,
          {
            title: this.state.title,
            hours: this.state.hours,
            address: this.state.address
          }
        ],
        taskDataSource: this.state.taskDataSource.cloneWithRows([
          ...prevState.tasks,
          {
            title: this.state.title,
            hours: this.state.hours,
            address: this.state.address
          }
        ]),
        // remove the modal
        modalVisible: false
      }));
    }
    // Redux
    this.props.addTask(
      this.props.user.uid,
      {
        title: this.state.title,
        hours: this.state.hours,
        address: this.state.address 
      });
  };
  removeTask = async(task) =>{
    var userRef = db.ref("Accounts/" + this.props.user.uid+ "/tasks/");
    var deleteReference = db.ref("Accounts/" + this.props.user.uid+ "/tasks/"+task.title);
    deleteReference.remove();
    let data = [];
    userRef.once("value", snapshot => {
      snapshot.forEach(childSnapshot => {
        var taskName = childSnapshot.key; // "task name"
        var taskDetails = childSnapshot.val();

        var temp = {
          title: taskName,
          hours: taskDetails.hours,
          address: taskDetails.address
        };
        data.push(temp);
        return false;
      });
      console.log(data);
      this.setState({
        tasks: data,
        taskDataSource: this.state.taskDataSource.cloneWithRows(data)
      });
    });
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
            <Toolbar />
            {/* Task List Toolbar */}
            {/* NOTE: ListView is deprecated */}
            <ListView
              dataSource={this.state.taskDataSource}
              renderRow={ (task) => { return <TaskRow task={task} press={this.removeTask.bind(this)} deleteMode={this.state.deleteMode} />} }
            />
            {/* Add a Task button */}
            <TouchableHighlight
              style={otherStyles.buttonContainer}
              onPress={this.showAddTask.bind(this)}
              underlayColor="white"
            >
              <View style={otherStyles.button}>
                <Text style={otherStyles.buttonText}>Add a Task</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              style={otherStyles.buttonContainer}
              onPress={this.showRemoveTask.bind(this)}
              underlayColor="white"
            >
              {/* Remove a Task Button */}
              <View style={otherStyles.button}>
                <Text style={otherStyles.buttonText}>Remove Task</Text>
              </View>
            </TouchableHighlight>
          </View>
          {/* Prompt for Adding */}
          <Modal
            animationType="slide"
            visible={this.state.modalVisible}
            enableEmptySections={true}
            onRequestClose={this._closeModal.bind(this)}
          >
            <View style={otherStyles.container}>
              <TextInput
                clearButtonMode="always"
                style={otherStyles.textInputContainerTask}
                placeholder="Task Title"
                onChangeText={text => this.setState({ title: text })}
                enableEmptySections={true}
              />
              <TextInput
                clearButtonMode="always"
                style={otherStyles.textInputContainerTask}
                placeholder="Task Hours"
                onChangeText={text => this.setState({ hours: text })}
                enableEmptySections={true}
              />
              <TextInput
                clearButtonMode="always"
                style={otherStyles.textInputContainerTask}
                placeholder="Task Address"
                onChangeText={text => this.setState({ address: text })}
                enableEmptySections={true}
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
                onPress={this._closeModal}
                underlayColor="white"
              >
                <View style={otherStyles.button}>
                  <Text style={otherStyles.buttonText}>Cancel Adding</Text>
                </View>
              </TouchableHighlight>
            </View>
          </Modal>
        </ScrollView>
      );
    }
  }
}
// create map of "store" object passed from Provider to this component's props
const mapStateToProps = store => {
  return {
    user: store.user.user // store.user == reducer, store.user.user == reducer.state.user
  };
};

// create map of "dispatch" object passed from Provider to this component's props
const mapDispatchToProps = dispatch => {
  return {
    addTask: (uid, task) => {
      dispatch(addTask(uid, task));
    }
  };
};

// connect() applies maps to component's props
export default connect(mapStateToProps, mapDispatchToProps)(TasksScreen);
