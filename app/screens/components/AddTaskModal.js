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
import styles from '../style'
import { connect } from "react-redux";
import { toggleModal, addTask } from "../../redux/actions/userActions";

import { db } from "../../config/db"

export class AddTaskModal extends React.Component {
  // constructor of the class, this stores the data(what it displays) for TaskScreen
  constructor() {
    super();
    var date = new Date();
    var dateString = this.formatDate(
      date.getUTCFullYear(),
      date.getUTCMonth() + 1,
      date.getUTCDate(),
    )
    this.state = {
      title: "",
      hours: "",
      address: "",
      city: "",
      state: "",
      streetAddress: "",
      zipcode: "",
      yyyymmdd: dateString,
      date: date,
      selectDateModal: false
    };
  }

  addTask = async () => {
    // Form Validation
    if (this.state.title.length === 0 || this.state.hours.length === 0){
      alert("Title and hours can not be empty!");
      return false;
    }
    let newTask = {

    }
    // this.props.addTask(this.props.user.uid, newTask)

    // user's database reference
    var userRef = db.ref("/Accounts/" + this.props.user.uid + "/taskDates/" + this.state.yyyymmdd + "/");
    var date
    await userRef.once("value", snapshot => {
      snapshot.forEach(childSnapshot => {
        date = childSnapshot.val
      })
    })

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
    } else {
      // else, add an object at index (length) of the size of the list
      var taskList;
      await userRef.once("value", snapshot => {
        taskList = snapshot.val();
        return false;
      })
      //console.log(tasksInTheDay.length)
      // update the task list at index of the length of the task array on that date
      userRef.child(taskList.length).set({
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
    
    this.props.toggleModal();
    // // Redux
    // this.props.addTask(
    //   this.props.user.uid,
    //   {
    //     title: this.state.title,
    //     hours: this.state.hours,
    //     address: this.state.address
    //   });
  };
  // close the modal (the form to add a task)
  _closeModal() {
    this.props.toggleModal();
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

  formatDate(year, month, day){
    var dateString;
    if (month < 10) {
      dateString = year + "-0" + month + "-" + day
    }
    else {
      dateString = year + "-" + month + "-" + day
    }
    return dateString;
  }
  
  androidDatePick = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({ mode: 'spinner' })
      if (action !== DatePickerAndroid.dismissedAction) {
        var dateChosen = new Date(year, month, day);
        var dateString = this.formatDate(year, month, day);
        
        this.setState({ yyyymmdd: dateString });
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message)
    }
  }
  setDate(newDate) {
    this.setState({ date: newDate });
  }
  render() {
    return (
      <Modal
        animationType="slide"
        visible={this.props.modalVisible}
        enableEmptySections={true}
        onRequestClose={this.props.toggleModal.bind(this)}
      >

        <View style={styles.modalContainer}>
          <Text style={styles.smallTitle}>{this.state.yyyymmdd}</Text>
          <TextInput
            clearButtonMode="always"
            style={styles.textInputContainerTask}
            placeholder="Task Title"
            onChangeText={text => this.setState({ title: text })}
            enableEmptySections={true}
          />
          <TextInput
            clearButtonMode="always"
            style={styles.textInputContainerTask}
            placeholder="Task Hours"
            onChangeText={text => this.setState({ hours: text })}
            enableEmptySections={true}
          />
          <TextInput
            clearButtonMode="always"
            style={styles.textInputContainerTask}
            placeholder="Task City"
            onChangeText={text => this.setState({ city: text })}
            enableEmptySections={true}
          />
          <TextInput
            clearButtonMode="always"
            style={styles.textInputContainerTask}
            placeholder="Task State"
            onChangeText={text => this.setState({ state: text })}
            enableEmptySections={true}
          />

          <TextInput
            clearButtonMode="always"
            style={styles.textInputContainerTask}
            placeholder="Task Street Address"
            onChangeText={text => this.setState({ streetAddress: text })}
            enableEmptySections={true}
          />

          <TextInput
            clearButtonMode="always"
            style={styles.textInputContainerTask}
            placeholder="Task Zipcode"
            onChangeText={text => this.setState({ zipcode: text })}
            enableEmptySections={true}
          />
          {/* Choose a date */}
          <TouchableHighlight
            style={styles.buttonContainer}
            onPress={Platform.OS === "ios" ? this._openDateModal.bind(this) : this.androidDatePick.bind(this)}
            underlayColor="white"
          >
            <View style={styles.button}>
              <Text style={styles.buttonText}>Change Date</Text>
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
                  style={styles.buttonContainer}
                  onPress={this._closeDateModal.bind(this)}
                  underlayColor="white"
                >
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>Choose Date</Text>
                  </View>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
          <TouchableHighlight
            style={styles.buttonContainer}
            onPress={this.addTask.bind(this)}
            underlayColor="white"
          >
            <View style={styles.button}>
              <Text style={styles.buttonText}>Add Task</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.buttonContainer}
            onPress={this._closeModal.bind(this)}
            underlayColor="white"
          >
            <View style={styles.button}>
              <Text style={styles.buttonText}>Cancel</Text>
            </View>
          </TouchableHighlight>
        </View>
      </Modal>
    );
  }
}

// create map of "store" object passed from Provider to this component's props
const mapStateToProps = store => {
  return {
    user: store.user.user, // store.user == reducer, store.user.user == reducer.state.user
    modalVisible: store.user.modalVisible
  };
};

// create map of "dispatch" object passed from Provider to this component's props
const mapDispatchToProps = (dispatch) => {
  return {
    toggleModal: () => {
      dispatch(toggleModal());
    },
    addTask: (uid, task) => {
      dispatch(addTask(uid, task));
    }
  }
}

// connect() applies maps to component's props
export default connect(mapStateToProps, mapDispatchToProps)(AddTaskModal);
