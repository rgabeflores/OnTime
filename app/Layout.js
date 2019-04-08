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
const mapStateToProps = (store) => {
    return {
      isLoggedIn: store.user.isLoggedIn, // Enables login status and redirection from login/register screens to home page
      error: store.user.error
    }
};

// connect() applies maps to component's props
export default connect(mapStateToProps)(Layout);
