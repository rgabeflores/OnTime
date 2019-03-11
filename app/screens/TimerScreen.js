import React from "react";
import { Text, SafeAreaView, View } from "react-native";
import { db } from "../config/db";

import { connect } from "react-redux";

export class TimerScreen extends React.Component {
  static navigationOptions = {
    title: "Timer"
  };
  state = {
    tasks: []
  };

  componentDidMount() {
    db.ref("Test/").on("value", snapshot => {
      let data = snapshot.val();
      let tasks = Object.values(data);
      this.setState({ tasks });
    });
  }
  render() {
    if(__DEV__) console.log(this.props.user);

    return (
      <View>
        {this.state.tasks.length > 0 ? (
          <View>
            {this.state.tasks.map((item, index) => {
              return (
                <View key={index}>
                  <Text>{item.name}</Text>
                  <Text>{item.pass}></Text>
                </View>
              );
            })}
          </View>
        ) : (
          <Text>No Items</Text>
        )}
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
export default connect(mapStateToProps)(TimerScreen);