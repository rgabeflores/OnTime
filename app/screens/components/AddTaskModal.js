import React from "react";

import {
  Text,
  View,
  TouchableHighlight,
  TextInput,
  Modal,
  Platform,
  DatePickerIOS,
  DatePickerAndroid,
  KeyboardAvoidingView
} from "react-native";

import { connect } from "react-redux";
import { toggleModal, addTask } from "../../redux/actions/userActions";

import styles from '../style';

export class AddTaskModal extends React.Component {
  // constructor of the class, this stores the data(what it displays) for TaskScreen
  constructor() {
    super();
    var date = new Date();
    var dateString = this.formatDate(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate(),
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
    if (this.state.title.length === 0 || this.state.hours.length === 0) {
      alert("Title and hours can not be empty!");
      return false;
    }

    let newTask = {
      name: this.state.title,
      time: this.state.hours,
      location: {
        city: this.state.city,
        state: this.state.state,
        streetAddress: this.state.streetAddress,
        zipcode: this.state.zipcode
      }
    };

    this.props.addTask(this.props.user.uid, this.state.yyyymmdd, newTask)
    this.props.toggleModal();
  };
  // close the modal (the form to add a task)
  _closeModal() {
    this.props.toggleModal();
  }
  _openDateModal() {
    this.setState({ selectDateModal: true });
  }
  _closeDateModal() {
    var date = this.state.date;
    // var date = JSON.stringify(this.state.date)
    // date = date.substring(1, 11)
    this.setState(prevState => ({
      ...prevState,
      selectDateModal: false,
      yyyymmdd: this.formatDate(date.getFullYear(), date.getMonth() + 1, date.getDate())
    }));
  }

  formatDate(year, month, day) {
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    return year + "-" + month + "-" + day;
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
    this.setState(prevState => ({
      ...prevState,
      date: newDate,
      yyyymmdd: this.formatDate(newDate.getFullYear(), newDate.getMonth() + 1, newDate.getDate())
    }));
  }
  render() {
    return (
      <Modal
        animationType="slide"
        visible={this.props.modalVisible}
        enableEmptySections={true}
        onRequestClose={this.props.toggleModal.bind(this)}
      > 
        <KeyboardAvoidingView style={styles.modalContainer} behavoir="padding" enabled>
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
            placeholder="Task Street Address"
            onChangeText={text => this.setState({ streetAddress: text })}
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
        </KeyboardAvoidingView>
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
    addTask: (uid, date, newTask) => {
      dispatch(addTask(uid, date, newTask));
    }
  }
}

// connect() applies maps to component's props
export default connect(mapStateToProps, mapDispatchToProps)(AddTaskModal);
