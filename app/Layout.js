import React from "react";
import { createRootNavigator } from "./navigation/router";
import { connect } from "react-redux";

export class Layout extends React.Component {
  render() {
    const Layout = createRootNavigator(this.props.isLoggedIn);
    return <Layout />;
  }
}

// create map of "store" object passed from Provider to this component's props
const mapStateToProps = (store) => {
    return {
      isLoggedIn: store.user.isLoggedIn, // store.user == reducer, store.user.user == reducer.state.user
    }
  };

// connect() applies maps to component's props
export default connect(mapStateToProps)(Layout);