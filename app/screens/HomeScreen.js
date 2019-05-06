import React from "react";
import { Agenda, calendarTheme } from "react-native-calendars";
import {
  Text,
  View,
  TouchableHighlight,
  Modal,
  TextInput
} from "react-native";

import { connect } from "react-redux";
import { toggleModal, addTask } from "../redux/actions/userActions";

import AddTaskModal from './components/AddTaskModal';
import EmptyDateView from './components/EmptyDateView';
import TaskView from './components/TaskView';
import HeaderButton from './components/HeaderButton';
import styles from "./style";

export class HomeScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
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

  componentDidMount() {
    this.props.navigation.setParams({ handleModal: this.props.toggleModal });
  }

  renderItem(item) {
    return (
      <TaskView item={item}/>
    );
  }
  renderEmptyDate(day){
    return(
      <EmptyDateView />
    )
  }
  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }
  
  addTask = e => {
    // user's database reference
    var userRef = db.ref("/Accounts/" + this.props.user.uid + "/tasks/");
    if (this.state.name.length === 0) {
      alert("Task name can not be empty!");
    } else {
      // update the database
      userRef.child(this.state.name).set({
        hours: this.state.hours,
        address: this.state.address
      })
      .then((response) => {
        this.props.toggleModal();
      })
      .catch(() => {
        alert("There was a problem saving your task.");
      });
      
    }
    // Redux
    this.props.addTask(
      this.props.user.uid,
      {
        name: this.state.name,
        hours: this.state.hours,
        address: this.state.address 
      });
  };
  loadItems(day) {
    // setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.props.user.account.taskDates[strTime]) {
          this.props.user.account.taskDates[strTime] = [];
          // const numItems = Math.floor(Math.random() * 5);
          // for (let j = 0; j < numItems; j++) {
          //   items[strTime].push({
          //     name: 'Item for ' + strTime,
          //     height: Math.max(50, Math.floor(Math.random() * 150))
          //   });
          // }
        }
      }
      // //console.log(items);
      // const newItems = {};
      // Object.keys(items).forEach(key => {newItems[key] = items[key];});
      // this.setState({
      //   items: newItems
      // });
    // }, 1000);
    // console.log(`Load Items for ${day.year}-${day.month}`);
  }
  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
  render() {
    // if(__DEV__) console.log(this.props.user.account.accountInfo.name);
    console.log(this.props.modalVisible);
    console.log(this.state);
    return(
      <View style={{width: "100%", height: "100%"}}>
        <Agenda
          items={this.props.user.account.taskDates} // List of items to display
          // callback that gets called on day press
          onDayPress={day => { console.log(day.dateString + " opened") }}
          // initially selected day
          selected={this.date}
          loadItemsForMonth={this.loadItems.bind(this)}
          // specify how each item should be rendered in agenda
          renderItem={this.renderItem.bind(this)}
          // specify how each date should be rendered. day can be undefined if the item is not first in that day.
          // renderDay={(day, {items}) => { return <AgendaTasksView day={day} items={items} /> }}
          // specify how empty date content with no items should be rendered
          renderEmptyDate={this.renderEmptyDate.bind(this)}
          // specify what should be rendered instead of ActivityIndicator
          // specify your item comparison function for increased performance
          rowHasChanged={this.rowHasChanged.bind(this)}
        />

        <AddTaskModal />
      </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
