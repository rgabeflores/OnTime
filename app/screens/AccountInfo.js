import React from "react";
import { Text } from "react-native";
import { connect } from "react-redux";

export class AccountInfo extends React.Component {
  constructor() {
    super();
  }

  render() {
    return <Text>sup</Text>;
  }
}
const mapStateToProps = store => {
  return {
    user: store.user.user // store.user == reducer, store.user.user == reducer.state.user
  };
};
export default connect(mapStateToProps)(AccountInfo);
