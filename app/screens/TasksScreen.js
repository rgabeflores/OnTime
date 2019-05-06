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
  Platform,
  DatePickerIOS,
  DatePickerAndroid
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
      address: "",
      city: "",
      state: "",
      streetAddress: "",
      zipcode: "",
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
            address: task.location.streetAddress + "\n\t\t\t" + task.location.city + ", " + task.location.state + " " + task.location.zipcode,
          };
          data.push(temp);
        })
        return false;
      });
      this.setState({
        tasks: data,
        taskDataSource: this.state.taskDataSource.cloneWithRows(data)
      });
    });
  };

  // when the user presses the remove task button
  updateView() {
    this.setState({ taskDataSource: this.state.taskDataSource.cloneWithRows(this.state.tasks) });
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
  addTask = async () => {
    // user's database reference
    var userRef = db.ref("/Accounts/" + this.props.user.uid + "/taskDates/" + this.state.yyyymmdd + "/");
    var date
    await userRef.once("value", snapshot => {
      snapshot.forEach(childSnapshot => {
        date = childSnapshot.val
      })
    })
    if (this.state.title.length === 0 || this.state.hours.length === 0) {
      alert("Title and hours can not be empty!");
    } else {
      // if the date has no tasks 
      if (typeof date === 'undefined') {
        // update the task list at index of 0 on that date
        userRef.child(0).set({
          time: this.state.hours,
          name: this.state.title,
          location: {
            city: this.state.city,
            state: this.state.state,
            streetAddress: this.state.streetAddress,
            zipcode: this.state.zipcode
          }
        });
      } else { // else, add an object at index (length) of the size of the list
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
              address: task.location.streetAddress + "\n\t\t\t" + task.location.city + ", " + task.location.state + " " + task.location.zipcode,
            };
            data.push(temp);
          })
          return false;
        })
        //console.log(tasksInTheDay.length)
        // update the task list at index of the length of the task array on that date
        userRef.child(data.length).set({
          time: this.state.hours,
          name: this.state.title,
          location: {
            city: this.state.city,
            state: this.state.state,
            streetAddress: this.state.streetAddress,
            zipcode: this.state.zipcode
          }
        })
      }
      this.setState(prevState => ({
        // clear the current inputs
        title: "",
        hours: "",
        address: "",
        yyyymmdd: "",
        // add a new set of tasks
        tasks: [
          ...prevState.tasks,
          {
            date: this.state.yyyymmdd,
            title: this.state.title,
            hours: this.state.hours,
            address: this.state.streetAddress + "\n\t\t\t" + this.state.city
              + ", " + this.state.state + " " + this.state.zipcode,
          }
        ],
        taskDataSource: this.state.taskDataSource.cloneWithRows([
          ...prevState.tasks,
          {
            date: this.state.yyyymmdd,
            title: this.state.title,
            hours: this.state.hours,
            address: this.state.streetAddress + "\n\t\t\t" + this.state.city
              + ", " + this.state.state + " " + this.state.zipcode,
          }
        ]),
        // remove the modal
        modalVisible: false
      }));
    }
    // // Redux
    // this.props.addTask(
    //   this.props.user.uid,
    //   {
    //     title: this.state.title,
    //     hours: this.state.hours,
    //     address: this.state.address
    //   });
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
          address: task.location.streetAddress + "\n\t\t\t" + task.location.city + ", " + task.location.state + " " + task.location.zipcode,
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
  // close the modal (the form to add a task)
  _closeModal() {
    this.setState({
      modalVisible: false
    });
  }
  _openDateModal() {
    this.setState({ selectDateModal: true });
  }
  _closeDateModal() {
    var date = JSON.stringify(this.state.date)
    date = date.substring(1, 11)
    console.log(date)

    this.setState({ selectDateModal: false, yyyymmdd: date });
  }
  androidDatePick = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({ mode: 'spinner' })
      if (action !== DatePickerAndroid.dismissedAction) {
        var dateChosen = new Date(year, month, day)
        if (month < 10) {
          var dateString = year + "-0" + month + "-" + day
          this.setState({ yyyymmdd: dateString })
        }
        else {
          var dateString = year + "-" + month + "-" + day
          this.setState({ yyyymmdd: dateString })
        }

        console.log(dateString)
        // returned undefined, try fixing it tomorrow TODO
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message)
    }
  }
  setDate(newDate) {
    this.setState({ date: newDate });
  }
  // when the task is pressed, make a popup asking if the user wants to remove the task
  pressRow(task) { }
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
          <View style={styles.container}>
            <Toolbar />
            {/* Task List Toolbar */}
            {/* NOTE: ListView is deprecated */}
            <ListView
              dataSource={this.state.taskDataSource}
              renderRow={(task) => { return <TaskRow task={task} press={this.removeTask.bind(this)} deleteMode={this.state.deleteMode} /> }}
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
                placeholder="Task City"
                onChangeText={text => this.setState({ city: text })}
                enableEmptySections={true}
              />
              <TextInput
                clearButtonMode="always"
                style={otherStyles.textInputContainerTask}
                placeholder="Task State"
                onChangeText={text => this.setState({ state: text })}
                enableEmptySections={true}
              />

              <TextInput
                clearButtonMode="always"
                style={otherStyles.textInputContainerTask}
                placeholder="Task Street Address"
                onChangeText={text => this.setState({ streetAddress: text })}
                enableEmptySections={true}
              />

              <TextInput
                clearButtonMode="always"
                style={otherStyles.textInputContainerTask}
                placeholder="Task Zipcode"
                onChangeText={text => this.setState({ zipcode: text })}
                enableEmptySections={true}
              />
              {/* Choose a date */}

              <Text>Chosen Date: {this.state.yyyymmdd}</Text>
              <TouchableHighlight
                style={otherStyles.buttonContainer}
                onPress={Platform.OS === "ios" ? this._openDateModal.bind(this) : this.androidDatePick.bind(this)}
                underlayColor="white"
              >
                <View style={otherStyles.button}>
                  <Text style={otherStyles.buttonText}>Choose a Date</Text>
                </View>
              </TouchableHighlight>
              <Modal
                animationType="slide"
                visible={this.state.selectDateModal}
                enableEmptySections={true}
                onRequestClose={this._closeModal.bind(this)}
              >
                <View style={{ flex: 1, justifyContent: 'center' }}>
                  <View style={Platform.OS === "ios" ? { flex: 1, justifyContent: 'center' } : { flex: 'None' }}>
                    <DatePickerIOS
                      mode='date'
                      date={this.state.date}
                      onDateChange={this.setDate.bind(this)}
                    />
                    <TouchableHighlight
                      style={otherStyles.buttonContainer}
                      onPress={this._closeDateModal.bind(this)}
                      underlayColor="white"
                    >
                      <View style={otherStyles.button}>
                        <Text style={otherStyles.buttonText}>Choose Date</Text>
                      </View>
                    </TouchableHighlight>
                  </View>
                </View>
              </Modal>
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
                onPress={this._closeModal.bind(this)}
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
