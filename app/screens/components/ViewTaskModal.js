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

import { connect } from "react-redux";
import { toggleModal, addTask } from "../../redux/actions/userActions";

import styles from '../style';

export class ViewTaskModal extends React.Component {
  constructor() {
    super();
    this.state = {
      modalVisible: false,
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
  }
  
  setDate(newDate) {
    this.setState({ date: newDate });
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
  render() {
    return (
      < Modal
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
      </Modal >
    );
  }
}

// create map of "store" object passed from Provider to this component's props
const mapStateToProps = store => {
  return {
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
export default connect(mapStateToProps, mapDispatchToProps)(ViewTaskModal);
