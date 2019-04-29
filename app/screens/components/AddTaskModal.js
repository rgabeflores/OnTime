import React from "react";
import {
  Text,
  View,
  TouchableHighlight,
  Modal,
  TextInput
} from "react-native";

import { connect } from "react-redux";
import { toggleModal, addTask } from "../../redux/actions/userActions";

import styles from '../style';

export class AddTaskModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          name: "",
          description: "",
          location: {
            city: "",
            state: "",
            streetAddress: "",
            zipcode: "",
          },
          time: "",
        }
    }
    addTask = e => {
        console.log("addTask()")
        // Redux
        // this.props.addTask(
        //   this.props.user.uid,
        //   {
        //     name: this.state.name,
        //     hours: this.state.hours,
        //     address: this.state.address 
        //   });
    };
    render(){
        return (
        <Modal
          animationType="slide"
          visible={this.props.modalVisible}
          enableEmptySections={true}
          onRequestClose={this.props.toggleModal.bind(this)}
        >
          <View style={styles.container}>
              <TextInput
                clearButtonMode="always"
                style={styles.textInputContainerTask}
                placeholder="Name"
                onChangeText={text => this.setState({ name: text })}
                enableEmptySections={true}
              />
              <TextInput
                clearButtonMode="always"
                style={styles.textInputContainerTask}
                placeholder="Street Address"
                onChangeText={text => this.setState(prevState => ({
                    location: {
                    ...prevState.location,
                    streetAddress: text 
                    }
                }))}
                enableEmptySections={true}
              />
              <TextInput
                clearButtonMode="always"
                style={styles.textInputContainerTask}
                placeholder="City"
                onChangeText={text => this.setState(prevState => ({
                    location: {
                    ...prevState.location,
                    city: text
                    } }))}
                enableEmptySections={true}
              />
              <TextInput
                clearButtonMode="always"
                style={styles.textInputContainerTask}
                placeholder="State"
                onChangeText={text => this.setState(prevState => ({ 
                    location: {
                    ...prevState.location,
                    state: text 
                    }
                }))}
                enableEmptySections={true}
              />
              <TextInput
                clearButtonMode="always"
                style={styles.textInputContainerTask}
                placeholder="Zipcode"
                onChangeText={text => this.setState(prevState => ({ 
                    location: {
                    ...prevState.location,
                    zipcode: text 
                    }
                }))}
                enableEmptySections={true}
              />
              <TextInput
                clearButtonMode="always"
                style={styles.textInputContainerTask}
                placeholder="Zipcode"
                onChangeText={text => this.setState({ 
                    time: text
                })}
                enableEmptySections={true}
              />
              <TouchableHighlight
                style={styles.modalButtonContainer}
                onPress={this.addTask.bind(this)}
                underlayColor="white"
              >
              <View style={styles.modalButton}>
                  <Text style={styles.modalButtonText}>Add Task</Text>
              </View>
              </TouchableHighlight>
              <TouchableHighlight
                style={styles.modalButtonContainer}
                onPress={this.props.toggleModal.bind(this)}
                underlayColor="white"
              >
              <View style={styles.modalButton}>
                  <Text style={styles.modalButtonText}>Cancel</Text>
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
  