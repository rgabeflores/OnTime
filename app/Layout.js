import React from "react";
import { createRootNavigator } from "./navigation/router";
import { connect } from "react-redux";

/**
 * This class encapsulates the layout of the app. This allows the app to pass props (such as a Redux store) to a root component of the layout.
 */
export class Layout extends React.Component {
  render() {
    // const Layout = createRootNavigator(this.props.isLoggedIn);
    const Layout = createRootNavigator(true);
    return <Layout />;
  }
}

// create map of "store" object passed from Provider to this component's props
<<<<<<< HEAD
const mapStateToProps = store => {
  return {
    isLoggedIn: store.user.isLoggedIn // store.user == reducer, store.user.user == reducer.state.user
=======
const mapStateToProps = (store) => {
    return {
      isLoggedIn: store.user.isLoggedIn, // Enables login status and redirection from login/register screens to home page
      error: store.user.error
    }
>>>>>>> ef6faad6e0d2c65695b351f21195f609dc641f5b
  };
};

// connect() applies maps to component's props
export default connect(mapStateToProps)(Layout);
