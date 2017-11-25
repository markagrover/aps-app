import React, { Component } from "react";
import * as actions from "../actions";
import { connect } from "react-redux";
import Button from "react-toolbox/lib/button/Button";
import JobRoll from "../components/Jobs/JobRoll";
import Client from "../components/Vendor/ClientDetails";
import NewClientForm from "../components/forms/Client/New";
import Card from "react-toolbox/lib/card/Card";
import CardTitle from "react-toolbox/lib/card/CardTitle";
import CardText from "react-toolbox/lib/card/CardText";
import List from "react-toolbox/lib/list/List";
import ListSubheader from "react-toolbox/lib/list/ListSubHeader";
import ListItem from "react-toolbox/lib/list/ListItem";
import ListDivider from "react-toolbox/lib/list/ListDivider";
import Dropdown from "react-toolbox/lib/dropdown/Dropdown";

const VendorDetails = ({ vendor }) => {
  const { company, email, phone, website, address } = vendor;
  const { houseNumber, street, city, state, zipcode } = address;
  return (
    <Card>
      <CardTitle title={company} subtitle={email} />
      <CardTitle subtitle={phone} />
      <CardTitle subtitle={website} />
      <CardTitle
        subtitle={`${houseNumber} ${street} ${city} ${state}, ${zipcode}`}
      />
    </Card>
  );
};

const ClientRoll2 = props => {
  if (props.showClients) {
      const clients = props.clients.map((client, i) => {
         return {value: client._id, name: `${client.fName} ${client.lName}`};
      });
      const customTemplate = (item) => {
          return (
            <div>
                <p>{item.name}</p>
            </div>
          );
      };
    return (
      <Dropdown
        auto
        label={"Select a Client"}
        source={clients}
        template={customTemplate}
        onChange={props.viewClient.bind()}
      />
    );
  }
};

// const ClientRoll = props => {
//   if (props.showClients) {
//     return props.clients.map((client, i) => {
//       const { lName, fName, email, phone } = client;
//       return (
//         <ListItem
//           selectable
//           key={i}
//           caption={`${fName} ${lName}`}
//           legend={email}
//           onClick={props.viewClient.bind(null, client._id)}
//         />
//       );
//     });
//   }
// };

class SingleVendorView extends Component {
  state = {
    addClient: false,
    addJob: false,
    editClient: false,
    editJob: false,
    showClients: true,
    showClient: false,
    showJobs: false,/* related to jobRoll on this page */
    showJob: false,
    showClientJobs: false,
    clients: [],
    activeJob: [],
    jobs: []
  };
  async viewClient(id) {
    await this.props.fetchClient(id);
    await this.setState({
      client: this.props.client,
      showJob: false
    });
    await this.setState({ showClient: true, activeClient: id });
    if (this.props.client.jobs) {
      this.setState({ showClientJobs: true });
    }
  }
  async getJob(id) {
    await this.props.fetchJob(id);
    await this.setState({ showJob: true, job: this.props.job });
  }

  submitNewClient() {}

  async submitNewJob(values) {
    const vendorId = this.props.match.params.vendorId; // get vendor Id
    await this.props.createJob(vendorId, this.state.activeClient, values);
    await this.props.fetchVendor(vendorId);
    await this.props.fetchClient(this.state.activeClient);
    this.setState({
      addJob: false,
      vendor: this.props.vendor,
      job: this.props.job,
      client: this.props.client
    });
  }
  onAddJob() {
    this.setState({
      addJob: !this.state.addJob
    });
  }
  renderOrFetchFirst() {
    if (this.state.vendor) {
      console.log("PROPS from Vendor=>", this.state);
      return (
        <div>
          <VendorDetails vendor={this.state.vendor.vendor} />
          <List ripple>
            <ListSubheader caption={"Vendor's Clients"} />
            <ClientRoll2
              viewClient={this.viewClient.bind(this)}
              showClients={this.state.showClients}
              clients={this.state.vendor.clients}
            />
          </List>

          <JobRoll
            showJobs={this.state.showJobs}
            jobs={this.state.vendor.vendor.jobs}
            getJob={() => ('hey')}
          />
          <Client
            job={this.state.job}
            showJob={this.state.showJob}
            getJob={this.getJob.bind(this)}
            showJobs={this.state.showClientJobs}
            onAddJob={this.onAddJob.bind(this)}
            client={this.state.client}
            addJob={this.state.addJob}
            newJobSubmit={this.submitNewJob.bind(this)}
            showClient={this.state.showClient}
          />
        </div>
      );
    } else {
      return <h5>LOADING...</h5>;
      // refactor this todo
    }
  }
  async componentDidMount() {
    if (!this.state.vendor) {
      await this.props.fetchVendor(this.props.match.params.vendorId);
      await this.setState({
        vendor: this.props.vendor
      });
    }// set all our state from our mapped props,
    await this.setState({
      vendor: this.props.vendor,
      job: this.props.job,
      client: this.props.client
    });
  }
  render() {
    return <div>{this.renderOrFetchFirst()}</div>;
  }
}

export default connect(
  ({ vendor, client, job }) => ({ vendor, client, job }),
  actions
)(SingleVendorView);
