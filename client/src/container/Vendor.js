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
import Layout from 'react-toolbox/lib/layout/Layout';
import Panel from 'react-toolbox/lib/layout/Panel';
import queryString from 'query-string';

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
    jobs: [],
    job: {}
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
    this.setState({ showJob: true, job: this.props.job });
  }
  async deleteClient(id){
      await this.props.deleteClient(id);
      await this.props.fetchVendor(this.props.match.params.vendorId);
      await this.props.fetchClients();
      this.setState({
          vendor: this.props.vendor,
          showClient: false
      });

    }
    async deleteJob(id){
        await this.props.deleteJob(id);
        await this.props.fetchVendor(this.props.match.params.vendorId);
        await this.props.fetchClient(this.state.client._id);
        this.setState({
            vendor: this.props.vendor,
            client: this.props.client,
            showJob: false
        });
    }

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

    async submitEditJob(values) {
        const vendorId = this.props.match.params.vendorId; // get vendor Id
        await this.props.updateJob(values);
        await this.props.fetchVendor(vendorId);
        await this.props.fetchClient(this.state.activeClient);
        await this.props.fetchJob(values._id);
        this.setState({
            editJob: false,
            vendor: this.props.vendor,
            job: this.props.job,
            client: this.props.client
        });
    }
    async submitEditClient(values) {
      console.log("values",values);
        const vendorId = this.props.match.params.vendorId; // get vendor Id
        await this.props.updateClient(values);
        await this.props.fetchVendor(vendorId);
        await this.props.fetchClient(this.state.activeClient);
        this.setState({
            editClient: false,
            vendor: this.props.vendor,
            job: this.props.job,
            client: this.props.client
        });
    }
    async submitNewClient(values) {
        const vendorId = this.props.match.params.vendorId; // get vendor Id
        await this.props.createClient(values);
        await this.props.fetchVendor(vendorId);
        await this.props.fetchClients();
        this.setState({
            addClient: false,
            vendor: this.props.vendor,
            job: this.props.job,
            client: this.props.client,
            showClient: true
        });
    }

  onAddJob() {
    this.setState({
      addJob: !this.state.addJob
    });
  }
 async toggleAddClient(){
      await this.setState({
          addClient: !this.state.addClient,
          editJob: false,
          editClient: false,
          showClient: false
      });
      this.props.fetchVendor(this.props.match.params.vendorId);
  }
   async toggleEditClient(e){
        const id = e.target.dataset.id;
       await this.props.editClient(id);
        this.setState({
            editClient: !this.state.editClient
        });
    }
   async toggleEditJob(e){
        const id = e.target.dataset.id;
        await this.props.editJob(id);
        this.setState({
            editJob: !this.state.editJob
        });
    }
  renderOrFetchFirst() {
    if (this.state.vendor) {
      console.log("PROPS from Vendor=>", this.state);
      return (
        <Layout>
            <Panel>
                <div style={{
                    width: '90%',
                    margin: '0 auto',
                    display: 'flex-column',
                    justifyContent: 'space-around'
                }}>
                    <div style={{
                        flex: '1'
                    }}>
                        <VendorDetails vendor={this.state.vendor.vendor} />
                        <List ripple>
                            <ListSubheader caption={"Vendor's Clients"} />
                            <Button onClick={this.toggleAddClient.bind(this)} label={"New Client"}/>
                            <ClientRoll2
                                viewClient={this.viewClient.bind(this)}
                                showClients={this.state.showClients}
                                clients={this.state.vendor.clients}
                            />
                        </List>
                    </div>
                    <div style={{
                        flex: '1'
                    }}>
                        <Client
                            editJobSubmit={this.submitEditJob.bind(this)}
                            newClientSubmit={this.submitNewClient.bind(this)}
                            editClientSubmit={this.submitEditClient.bind(this)}
                            onToggleEditClient={this.toggleEditClient.bind(this)}
                            onToggleEditJob={this.toggleEditJob.bind(this)}
                            onToggleAddClient={this.toggleAddClient.bind(this)}
                            job={this.state.job}
                            showJob={this.state.showJob}
                            getJob={this.getJob.bind(this)}
                            showJobs={this.state.showClientJobs}
                            onAddJob={this.onAddJob.bind(this)}
                            client={this.state.client}
                            addJob={this.state.addJob}
                            newJobSubmit={this.submitNewJob.bind(this)}
                            showClient={this.state.showClient}
                            addClient={this.state.addClient}
                            editClient={this.state.editClient}
                            editJob={this.state.editJob}
                            deleteJob={this.deleteJob.bind(this)}
                            deleteClient={this.deleteClient.bind(this)}
                        />
                    </div>
                </div>



          </Panel>
        </Layout>
      );
    } else {
      return <h5>LOADING...</h5>;
      // refactor this todo
    }
  }
   async componentWillMount(){
      console.log("PROPS from --",queryString.parse(this.props.location.search));
      const configs = queryString.parse(this.props.location.search);
      if(configs.showClient && configs.clientId){
         await this.props.fetchClient(configs.clientId);
          this.setState({
              showClient: true,
              client: this.props.client,
              activeClient: configs.clientId
          });
          if (this.props.client.jobs) {
              this.setState({ showClientJobs: true });
          }
      }

  }
  async componentDidMount() {

    if (!this.state.vendor) {
      await this.props.fetchVendor(this.props.match.params.vendorId);
     // await this.props.fetchVendor(this.props.match.params.vendorId);
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
