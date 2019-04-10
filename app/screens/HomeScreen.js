import React from "react";
import { Agenda, calendarTheme } from "react-native-calendars";
import { Text, View, Button } from "react-native";

import { connect } from "react-redux";

import TaskView from './components/TaskView';
import styles from "./style";

export class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Calendar"
  };

  constructor(props) {
    super(props);
  }
  renderItem(item) {
    return (
      <TaskView item={item}/>
    );
  }
  renderEmptyDate() {
    return (
      <View>
        <Text>Nothing saved for this date</Text>
      </View>
    );
  }
  renderEmptyData(){
    return(
      <View>
        <Text>No tasks scheduled for this day</Text>
      </View>
    )
  }
  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  render() {
    // if(__DEV__) console.log(this.props.user.account.accountInfo.name);
    return(
      <Agenda
        items={this.props.user.account.taskDates} // List of items to display
        // callback that gets called on day press
        onDayPress={day => { console.log(day.dateString + " opened") }}
        // initially selected day
        selected={this.date}
        // specify how each item should be rendered in agenda
        renderItem={this.renderItem.bind(this)}
        // specify how each date should be rendered. day can be undefined if the item is not first in that day.
        // renderDay={(day, {items}) => { return <AgendaTasksView day={day} items={items} /> }}
        // specify how empty date content with no items should be rendered
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        // specify what should be rendered instead of ActivityIndicator
        renderEmptyData = {this.renderEmptyData.bind(this)}
        // specify your item comparison function for increased performance
        rowHasChanged={this.rowHasChanged.bind(this)}
      />
    );
  }

}

// create map of "store" object passed from Provider to this component's props
const mapStateToProps = store => {
  return {
    user: store.user.user // store.user == reducer, store.user.user == reducer.state.user
  };
};

// create map of "dispatch" object passed from Provider to this component's props
// const mapDispatchToProps = (dispatch) => {
//   return {
//     setUserName: (uid, name) => {
//       dispatch(setUserName(uid, name));
//     }
//   }
// }

// connect() applies maps to component's props
export default connect(mapStateToProps)(HomeScreen);
