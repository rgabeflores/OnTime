import React from "react";
import { Calendar, Agenda, calendarTheme } from "react-native-calendars";
import { Text, View, SafeAreaView, Button } from "react-native";

import { connect } from "react-redux";
import db from "../config/db";

import styles from "./style";

import { WebBrowser } from "expo";

export class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Calendar"
  };

  constructor(props) {
    super(props);
    this.state = {
      calendarView: true,
      items: {
        "2019-03-06": [{ text: "item 1 - any js object" }],
        "2019-03-06": [{ text: "item 2 - any js object" }],
        "2018-05-24": [],
        "2018-05-25": [
          { text: "item 3 - any js object" },
          { text: "any js object" }
        ]
      }
    };
  }

  render() {
    if(__DEV__) console.log(this.props.user.account);
    
    if (this.state.calendarView === true) {
      let today = new Date(); // Move to redux?
      date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      minDate =
        today.getFullYear() -
        5 +
        "-" +
        today.getMonth() +
        1 +
        "-" +
        today.getDate();
      maxDate =
        today.getFullYear() +
        5 +
        "-" +
        today.getMonth() +
        1 +
        "-" +
        today.getDate();

      return (
        <View>
          <Button title="Switch" onPress={() => this.handleClick()} />
          <Calendar
            // Handler which gets executed on day press. Default = undefined
            onDayPress={day => {
              console.log("selected day", day);
            }}
            // Handler which gets executed on day long press. Default = undefined
            monthFormat={"MMM yyyy"}
            // Handler which gets executed when visible month changes in calendar. Default = undefined
            onMonthChange={month => {
              console.log("month changed", month);
            }}
            // Hide month navigation arrows. Default = false
            hideArrows={false}
            renderArrow={this.renderArrow}
            // Do not show days of other months in month page. Default = false
            hideExtraDays={false}
            // day from another month that is visible in calendar page. Default = false
            disableMonthChange={true}
            // If firstDay=0 week starts from Sunday. Note that dayNames and dayNamesShort should still start from Sunday.
            firstDay={0}
            // Hide day names. Default = false
            hideDayNames={false}
            // Show week numbers to the left. Default = false
            showWeekNumbers={false}
            // Handler which gets executed when press arrow icon left. It receive a callback can go back month
            onPressArrowLeft={substractMonth => substractMonth()}
            // Handler which gets executed when press arrow icon left. It receive a callback can go next month
            onPressArrowRight={addMonth => addMonth()}
          />
        </View>
      );
    } else {
      return (
        <SafeAreaView style={styles.calendar}>
          <Button title="Switch" onPress={() => this.handleClick()} />
          <Agenda
            // the list of items that have to be displayed in agenda. If you want to render item as empty date
            // the value of date key kas to be an empty array []. If there exists no value for date key it is
            // considered that the date in question is not yet loaded

            // callback that gets called when items for a certain month should be loaded (month became visible)
            loadItemsForMonth={month => {
              console.log("trigger items loading");
            }}
            // callback that fires when the calendar is opened or closed
            onCalendarToggled={calendarOpened => {
              console.log(calendarOpened);
            }}
            // callback that gets called on day press
            onDayPress={day => {
              <View styles={{ marginTop: 100 }}>
                <Text>{this.state.items}</Text>
              </View>;
            }}
            // callback that gets called when day changes while scrolling agenda list
            onDayChange={day => {
              console.log("day changed");
            }}
            // initially selected day
            selected={this.date}
            // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
            minDate={this.minDate}
            // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
            maxDate={this.maxDate}
            // Max amount of months allowed to scroll to the past. Default = 50
            pastScrollRange={50}
            // Max amount of months allowed to scroll to the future. Default = 50
            futureScrollRange={50}
            // specify how each item should be rendered in agenda
            renderItem={() => {
              return <View />;
            }}
            // specify how each date should be rendered. day can be undefined if the item is not first in that day.
            renderDay={(day, item) => {
              console.log();
              return <View styles={{ marginTop: 100 }} />;
            }}
            // specify how empty date content with no items should be rendered
            renderEmptyDate={() => {
              return <View />;
            }}
            // specify how agenda knob should look like
            renderKnob={() => {
              return <View />;
            }}
            // specify what should be rendered instead of ActivityIndicator
            renderEmptyData={() => {
              return <View />;
            }}
            // specify your item comparison function for increased performance
            rowHasChanged={(r1, r2) => {
              return r1.text !== r2.text;
            }}
            // Hide knob button. Default = false
            hideKnob={false}
            // By default, agenda dates are marked if they have at least one item, but you can override this if needed
            markedDates={{
              "2012-05-16": { selected: true, marked: true },
              "2012-05-17": { marked: true },
              "2012-05-18": { disabled: true }
            }}
            // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly.
            onRefresh={() => console.log("refreshing...")}
            // Set this true while waiting for new data from a refresh
            refreshing={false}
            // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView.
            refreshControl={null}
            // agenda theme
            theme={{
              ...calendarTheme,
              agendaDayTextColor: "yellow",
              agendaDayNumColor: "green",
              agendaTodayColor: "red",
              agendaKnobColor: "blue"
            }}
            // agenda container style
            style={{}}
          />
        </SafeAreaView>
      );
    }
  }
  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use
          useful development tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync(
      "https://docs.expo.io/versions/latest/guides/development-mode"
    );
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      "https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes"
    );
  };

  handleClick = () => {
    this.state.calendarView === true
      ? this.setState({ calendarView: false })
      : this.setState({ calendarView: true });
  };
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
//     dispatch
//   }
// }

// connect() applies maps to component's props
export default connect(mapStateToProps)(HomeScreen);
