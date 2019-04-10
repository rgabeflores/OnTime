import React from "react";
import { Agenda, calendarTheme } from "react-native-calendars";
import { Text, View, Button } from "react-native";

import { connect } from "react-redux";

import DayView from './components/DayView';
import styles from "./style";

export class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Calendar"
  };

  constructor(props) {
    super(props);
    this.state = {
      items: {
        "2019-03-06": [{ text: "item 1 - any js object" }],
        "2019-03-06": [{ text: "item 2 - any js object" }],
        "2019-04-24": [{ text: "item 2 - any js object" }],
        "2019-05-25": [
          { text: "item 3 - any js object" },
          { text: "any js object" }
        ]
      }
    };
  }

  render() {
    // if(__DEV__) console.log(this.props.user.account.accountInfo.name);
    return(
      <Agenda
        items={this.state.items} // List of items to display
        // callback that gets called when items for a certain month should be loaded (month became visible)
        loadItemsForMonth={month => { console.log("trigger items loading"); }}
        // callback that fires when the calendar is opened or closed
        onCalendarToggled={calendarOpened => { console.log(calendarOpened); }}
        // callback that gets called on day press
        onDayPress={day => { console.log(day) }}
        // callback that gets called when day changes while scrolling agenda list
        onDayChange={day => { console.log("day changed"); }}
        // initially selected day
        selected={this.date}
        // Max amount of months allowed to scroll to the past. Default = 50
        pastScrollRange={50}
        // Max amount of months allowed to scroll to the future. Default = 50
        futureScrollRange={50}
        // specify how each item should be rendered in agenda
        renderItem={() => { return <View />; }}
        // specify how each date should be rendered. day can be undefined if the item is not first in that day.
        renderDay={(day, item) => { return <DayView day={day} item={item} /> }}
        // specify how empty date content with no items should be rendered
        // renderEmptyDate={() => { return <DayView day={this.date} item={[{text: "this day is empty"}]} /> }}
        // specify how agenda knob should look like
        // renderKnob={() => { return <View/>; }}
        // specify your item comparison function for increased performance
        rowHasChanged={(r1, r2) => { return r1.text !== r2.text; }}
        onRefresh={() => console.log("refreshing...")}
        refreshing={false}
        refreshControl={null}
        theme={{
          ...calendarTheme,
          agendaDayTextColor: "yellow",
          agendaDayNumColor: "green",
          agendaTodayColor: "red",
        }}
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
