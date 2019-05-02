import React from "react";

import {
  Text,
  View,
  ListView,
  TouchableHighlight,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import { toggleModal, addTask } from "../redux/actions/userActions";

import { db } from "../config/db";

import TaskRow from "./components/TaskRow";
import AddTaskModal from "./components/AddTaskModal";

import styles from "./style";

export class TasksScreen extends React.Component {
  static navigationOptions = {
    title: "Tasks"
  };

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
      // address: "",
      location: {
        city: "",
        state: "",
        streetAddress: "",
        zipcode: "",
      },
      yyyymmdd: "",
      date: new Date(),
      selectDateModal: false
    };

  }

  componentDidMount() {
    this.getItems();
  }

  // get the items from the list view
  getItems = async () => {
    // user's database reference
    var userRef = db.ref("/Accounts/" + this.props.user.uid + "/taskDates/" + this.state.yyyymmdd + "/");
    let data = [];
    userRef.once("value", snapshot => {
      snapshot.forEach(childSnapshot => {
        var date = childSnapshot.key; // the key is the date (?)
        var taskList = childSnapshot.val(); // 
        taskList.forEach(task => {
          var temp = {
            date: date,
            title: task.name,
            hours: task.time,
            location: {
              streetAddress: task.location.streetAddress,
              city: task.location.city,
              state: task.location.state,
              zipcode: task.location.zipcode
            }
            // address: task.location.streetAddress + "\n\t\t\t" + task.location.city + ", " + task.location.state + " " + task.location.zipcode,
          };
          data.push(temp);
        })
        return false;
      });
      this.setState(prevState => ({
        ...prevState,
        tasks: data,
        taskDataSource: this.state.taskDataSource.cloneWithRows(data)
      }));
    });
  };

  // when the user presses the remove task button
  updateView() {
    this.setState(prevState => ({
      ...prevState,
      taskDataSource: this.state.taskDataSource.cloneWithRows(this.state.tasks)
    }));
  }

  showAddTask = e => {
    this.props.toggleModal();
    this.setState(prevState => ({
      ...prevState,
      modalVisible: true
    }));
  };

  showRemoveTask = e => {
    this.setState(prevState => ({
      ...prevState,
      deleteMode: !prevState.deleteMode
    }));
  };
  
  removeTask = async (task) => {
    var userRef = db.ref("/Accounts/" + this.props.user.uid + "/taskDates/" + task.date + "/");
    var data = [];
    // fetch data from db
    await userRef.once("value", snapshot => {
      var date = snapshot.key; // "date"
      var taskList = snapshot.val();
      taskList.forEach(task => {
        var temp = {
          date: date,
          title: task.name,
          hours: task.time,
          location: {
            streetAddress: task.location.streetAddress,
            city: task.location.city,
            state: task.location.state,
            zipcode: task.location.zipcode
          }
          // address: task.location.streetAddress + "\n\t\t\t" + task.location.city + ", " + task.location.state + " " + task.location.zipcode,
        };
        data.push(temp);
      })
      return false;
    })
    // look for the index of the task to be deleted
    // assume key is equal to task name and time
    var index = -1
    var lookForTask = data.find(function (item, i) {
      if (item.name === task.name && item.time == task.time) {
        index = i;
        return i;
      }
    });
    var localIndex = -1
    var lookForTaskLocal = this.state.tasks.find(function (item, i){
      if(item === task){
        localIndex = i
        return i;
      }
    })
    // if the index is found, remove the said task
    if (index !== -1) {
      var deleteReference = db.ref("/Accounts/" + this.props.user.uid + "/taskDates/" + task.date + "/" + index);
      await deleteReference.remove();
      // update the view
      var taskListNew = this.state.tasks
      var removedTaskArray = taskListNew.splice(localIndex, 1)
      console.log(localIndex);
      this.setState(prevState => ({
        // remove the task at the local index
        tasks: taskListNew,
        taskDataSource: this.state.taskDataSource.cloneWithRows(taskListNew),
      }));
    } else { // error handling
      alert("The Task To Be Removed Cannot Be Found! Look at TasksScreen.js")
    }
  }
  
  setDate(newDate) {
    this.setState(prevState => ({
      ...prevState,
      date: newDate
    }));
  }

  render() {
    // return 'loading' if there is no data that was fetched
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
          <View style={{...styles.container, width: "100%"}}>
            <ListView
              dataSource={this.state.taskDataSource}
              renderRow={(task) => { return <TaskRow task={task} press={this.removeTask.bind(this)} deleteMode={this.state.deleteMode} /> }}
            />
            {/* Add a Task button */}
            <TouchableHighlight
              style={styles.buttonContainer}
              onPress={this.showAddTask.bind(this)}
              underlayColor="white"
            >
              <View style={styles.button}>
                <Text style={styles.buttonText}>Add a Task</Text>
              </View>
            </TouchableHighlight>

            {/* Remove a Task Button */}
            <TouchableHighlight
              style={styles.buttonContainer}
              onPress={this.showRemoveTask.bind(this)}
              underlayColor="white"
            >
              <View style={styles.button}>
                <Text style={styles.buttonText}>Remove Task</Text>
              </View>
            </TouchableHighlight>
          </View>
          <AddTaskModal />
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
    toggleModal: () => {
      dispatch(toggleModal());
    },
    addTask: (uid, task) => {
      dispatch(addTask(uid, task));
    }
  };
};

// connect() applies maps to component's props
export default connect(mapStateToProps, mapDispatchToProps)(TasksScreen);
