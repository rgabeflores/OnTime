import React from 'react';
import {
  Text,
  View,
  Button,
  TouchableHighlight,
  Modal
} from 'react-native';


import { connect } from "react-redux";
import otherStyles from "./style";
import { db } from "../config/db";
import {
  StackedBarChart,
  XAxis,
  Grid,
  PieChart
} from 'react-native-svg-charts'
export class StatisticsScreen extends React.Component {

  static navigationOptions = {
    title: 'Statistics',
  };

  // generates a random color hexcode
  randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7);
  constructor() {
    super();
    this.state = {
      tasks: [],
      titles: [],
      colors: [],
      data: [],
      // keys is what the label is in the task
      keys: ['hours'],
      finishedFetch: false,
      ptModalVisible: false,
    };
  }
  // fetch the data from the database
  componentDidMount() {
    this.getItems();
  }
  // fetching the data from the database
  getItems = async () => {
    // clear the current state
    this.setState({
      tasks: [],
      titles: [],
      colors: [],
      data: [],
      keys: ['hours'],
      finishedFetch: false,
    })
    // fetch items from db
    var userRef = db.ref("Accounts/" + this.props.user.uid + "/tasks/");
    let dbData = [];
    userRef.once("value", snapshot => {
      snapshot.forEach(childSnapshot => {
        var taskName = childSnapshot.key; // "task name"
        var taskDetails = childSnapshot.val();
        // console.log(taskName);
        // console.log(taskDetails);
        var temp = {
          title: taskName,
          hours: taskDetails.hours,
          address: taskDetails.address
        };
        dbData.push(temp);
        return false;
      });
      for (i = 0; i < dbData.length; i++) {
        this.setState(prevState => ({
          data: [...prevState.data, dbData[i].hours],
          colors: [...prevState.colors, ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7)],
          titles: [...prevState.titles, dbData[i].title],
          //keys: [...prevState.keys, dbData[i].title]
        }))
      }
      this.setState({
        tasks: dbData,
      });
      this.setState({ finishedFetch: true })
    });
  };
  closePTModal = () => {
    this.setState({
      ptModalVisible: false
    });
  }
  openPTModal = () => {
    this.getItems()
    this.setState({
      ptModalVisible: true
    });
  }
  render() {
    var pieData = this.state.data
      .filter(value => value > 0)
      .map((value, index) => ({
        value,
        svg: {
          fill: this.state.colors[index]
        },
        key: `pie-${index}`
      }))
    return (
      <View>
        <TouchableHighlight
          style={otherStyles.buttonContainer}
          onPress={this.openPTModal.bind(this)}
          underlayColor="white"
        >
          <View style={otherStyles.button}>
            <Text style={otherStyles.buttonText}>
              {"Display Planned Tasks for " + this.props.user.account.accountInfo.name}
            </Text>
          </View>
        </TouchableHighlight>
        <Modal
          animationType="slide"
          visible={this.state.ptModalVisible}
          enableEmptySections={true}
          onRequestClose={this.closePTModal.bind(this)}
        >
          <View style = {{flex: 1, justifyContent: 'center'}}>
            
            <Text style={{ fontSize: 20 }}>Planned Tasks for {this.props.user.account.accountInfo.name}</Text>
            <PieChart
              style={{ height: 200 }}
              data={pieData}
            />
            <Text>Legend</Text>
            {this.state.titles.map((title, idx) => (
              <View>
                <Text
                  style={{ color: `${this.state.colors[idx]}` }}>
                  {title}
                </Text>
              </View>
            ))}
            <TouchableHighlight
              style={otherStyles.buttonContainer}
              onPress={this.closePTModal}
              underlayColor="white"
            >
              <View style={otherStyles.button}>
                <Text style={otherStyles.buttonText}>
                  Close Planned Tasks
                </Text>
              </View>
            </TouchableHighlight>
          </View>
        </Modal>
      </View>
    );
  }
}

// create map of "store" object passed from Provider to this component's props
const mapStateToProps = (store) => {
  return {
    user: store.user.user, // store.user == reducer, store.user.user == reducer.state.user
  }
};

// create map of "dispatch" object passed from Provider to this component's props
// const mapDispatchToProps = (dispatch) => {
//   return {
//     dispatch
//   }
// }

// connect() applies maps to component's props
export default connect(mapStateToProps)(StatisticsScreen);