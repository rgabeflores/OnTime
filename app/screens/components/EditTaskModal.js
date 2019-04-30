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
import { toggleEditModal, addTask } from "../../redux/actions/userActions";

import { db } from "../../config/db"

export class EditTaskModal extends React.Component {
  // constructor of the class, this stores the data(what it displays) for TaskScreen
  constructor() {
    super();
    var date = new Date();
    this.state = {
      title: "",
      hours: "",
      address: "",
      city: "",
      state: "",
      streetAddress: "",
      zipcode: "",
      yyyymmdd: "",
      date: date,
    };
  }

  render() {
    return (
      <Modal
        animationType="slide"
        visible={this.props.editModalVisible}
        enableEmptySections={true}
        onRequestClose={this.props.toggleEditModal.bind(this)}
      >
        <View style={styles.modalContainer}>
            <View>
                <Text style={styles.smallTitle}>Edit Task</Text>
            </View>
            <View>
                <Text style={styles.miniTitle}>{this.props.task.name}</Text>
                <Text>{this.props.task.location.streetAddress}</Text>
                <Text>{this.props.task.location.city}, {this.props.task.location.state} {this.props.task.location.zipcode}</Text>

                <TouchableHighlight
                    style={styles.buttonContainer}
                    onPress={this.props.toggleEditModal.bind(this)}
                    underlayColor="white"
                >
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </View>
                </TouchableHighlight>
            </View>
        </View>
    </Modal>
    );
  }
}

// create map of "store" object passed from Provider to this component's props
const mapStateToProps = store => {
  return {
    user: store.user.user, // store.user == reducer, store.user.user == reducer.state.user
    editModalVisible: store.user.editModalVisible,
    currentDay: store.user.currentDay,
  };
};

// create map of "dispatch" object passed from Provider to this component's props
const mapDispatchToProps = (dispatch) => {
  return {
    toggleEditModal: () => {
      dispatch(toggleEditModal());
    },
    addTask: (uid, task) => {
      dispatch(addTask(uid, task));
    }
  }
}

// connect() applies maps to component's props
export default connect(mapStateToProps, mapDispatchToProps)(EditTaskModal);
