import React from "react";
import { Agenda } from "react-native-calendars";
import {
  Text,
  View,
} from "react-native";

import { connect } from "react-redux";
import { toggleModal, toggleEditModal, setDay, addTask } from "../redux/actions/userActions";

import AddTaskModal from './components/AddTaskModal';
import EditTaskModal from './components/EditTaskModal';
import EmptyDateView from './components/EmptyDateView';
import TaskView from './components/TaskView';
import HeaderButton from './components/HeaderButton';
import styles from "./style";

export class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: 'Calendar',
      headerRight:
        <HeaderButton
          content={"+"}
          onPress={() => params.handleModal()}
        />
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      task: {
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

  }

  componentDidMount() {
    this.props.navigation.setParams({ handleModal: this.props.toggleModal });
  }

  renderItem(item) {
    return (
      <TaskView item={item} action={this.toggleEditModal.bind(this)} />
    );
  }
  renderEmptyDate(day) {
    return (
      <EmptyDateView />
    )
  }
  renderEmptyData(day) {
    return (
      <EmptyDateView>
        <Text style={{ ...styles.smallTitle, color: "lightgrey", width: "95%" }}>Select a date to view your tasks.</Text>
      </EmptyDateView>
    )
  }
  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  toggleEditModal(task) {
    this.setState(prevState => ({ ...prevState, task }));
    this.props.toggleEditModal()
  }
  loadItems(day) {
    for (let i = -15; i < 85; i++) {
      const time = day.timestamp + i * 24 * 60 * 60 * 1000;
      const strTime = this.timeToString(time);
      if (!this.props.user.account.taskDates[strTime]) {
        this.props.user.account.taskDates[strTime] = [];
      }
    }
  }
  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
  render() {
    return (
      <View style={{ width: "100%", height: "100%" }}>
        <Agenda
          items={this.props.user.account.taskDates}
          onDayPress={day => { console.log(day.dateString) }}
          selected={this.date}
          loadItemsForMonth={this.loadItems.bind(this)}
          renderItem={this.renderItem.bind(this)}
          renderEmptyDate={this.renderEmptyDate.bind(this)}
          renderEmptyData={this.renderEmptyData.bind(this)}
          rowHasChanged={this.rowHasChanged.bind(this)}
        />

        <AddTaskModal />
        <EditTaskModal task={this.state.task} />
      </View>
    );
  }

}

// create map of "store" object passed from Provider to this component's props
const mapStateToProps = store => {
  return {
    user: store.user.user, // store.user == reducer, store.user.user == reducer.state.user
    modalVisible: store.user.modalVisible,
    editModalVisible: store.user.editModalVisible,
    test: store.user.test
  };
};

// create map of "dispatch" object passed from Provider to this component's props
const mapDispatchToProps = (dispatch) => {
  return {
    toggleModal: () => {
      dispatch(toggleModal());
    },
    toggleEditModal: () => {
      dispatch(toggleEditModal());
    },
    setDay: (day) => {
      dispatch(setDay(day));
    },
    addTask: (uid, task) => {
      dispatch(addTask(uid, task));
    }
  }
}

// connect() applies maps to component's props
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
