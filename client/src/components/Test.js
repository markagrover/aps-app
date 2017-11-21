import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

class Test extends Component {
  render() {
    console.log(this.props);
    return <div>{this.props.test}</div>;
  }
}

function mapStateToProps({ test }) {
  return {
    test
  };
}

export default connect(mapStateToProps, actions)(Test);
