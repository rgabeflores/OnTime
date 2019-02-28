import React from "react";
import { Text, SafeAreaView } from "react-native";

import { connect } from "react-redux";

export class TimerScreen extends React.Component {
  static navigationOptions = {
    title: "Timer"
  };

  render() {
    if(__DEV__) console.log(this.props.user);

    return (
      <SafeAreaView>
        <Text>Something</Text>
      </SafeAreaView>
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