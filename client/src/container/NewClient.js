import React, { Component } from "react";
import ClientForm from "../components/forms/Client/New";
import axios from "axios";
import { connect } from "react-redux";
import * as actions from "../actions";

// const submit = async values => {
//   await this.props.createClient(values);
//   this.history.push("/clients");
// };

class NewClient extends Component {


  async submit(values){
    await this.props.createClient(values);
    this.props.history.push("/clients");
    }
  render() {
    return <ClientForm onSubmit={this.submit.bind(this)} />;
  }
}

export default connect(null, actions)(NewClient);
