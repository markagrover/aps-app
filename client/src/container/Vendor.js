import React, { Component } from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';
import Button from 'react-toolbox/lib/button/Button';
import JobRoll from '../components/Jobs/JobRoll';
import Client from '../components/Vendor/ClientDetails';
import NewClientForm from '../components/forms/Client/New';

const VendorDetails = ({vendor}) => {
    return (
        <li style={{
            border: '1px solid black',
            borderRadius: '10px',
            padding: '10px',
            margin: '10px',
            listStyle: 'none'
        }}>
            <p>Company Name: {vendor.company}</p>
            <p>Email: {vendor.email}</p>
            <p>Phone: {vendor.phone}</p>
            <p>WebSite: {vendor.website}</p>
            <p>Address: {`${vendor.address.houseNumber} ${vendor.address.street} ${vendor.address.city}, ${vendor.address.state}`}</p>
            <Button/>
        </li>
    );
}

const ClientRoll = ( props ) => {

    if(props.showClients){
       return props.clients.map((client, i) => {
            return (
                <li key={i} style={{
                    border: '1px dotted blue',
                    borderRadius: '10px',
                    padding: '10px',
                    margin: '10px',
                    listStyle: 'none'
                }}>
                    <p> {client.fName + ' ' + client.lName}</p>
                    <p> {client.email}</p>
                    <p> {client.phone}</p>
                    <Button data-id={client._id} onClick={props.viewClient}/>

                </li>
            )
        })
    }


};


class SingleVendorView extends Component {
    state = {
        addClient: false,
        addJob: false,
        editClient: false,
        editJob: false,
        showClients: true,
        showClient: false,
        showJobs: false,
        showClientJobs: false,
        clients: [],

        activeJob: [],
        jobs: []
    };
   async viewClient(e){
      const id = e.target.dataset.id;
     await this.props.fetchClient(id);
      this.setState({showClient: true, activeClient: id});
       if(this.props.client.jobs){
           this.setState({showClientJobs: true});
       }
    };


    submitNewClient(){

    }
   async submitNewJob( values ){
        const vendorId = this.props.match.params.vendorId;// get vendor Id
       await this.props.createJob(vendorId ,this.state.activeClient, values);
       await this.props.fetchVendor(vendorId);
       await this.props.fetchClient(this.state.activeClient);
    }
    onAddJob(){
        this.setState({
            addJob: true
        })
    }
   renderOrFetchFirst(){
       if(this.props.vendor){
           console.log("PROPS from Vendor=>",this.props);
           return (
               <div>
                   <VendorDetails vendor={this.props.vendor.vendor}/>
                   <ClientRoll viewClient={this.viewClient.bind(this)} showClients={this.state.showClients} clients={this.props.vendor.clients} />
                   <JobRoll showJobs={this.state.showJobs} jobs={this.props.vendor.jobs} />
                   <Client showJobs={this.state.showClientJobs} onAddJob={this.onAddJob.bind(this)} client={this.props.client} addJob={this.state.addJob} newJobSubmit={this.submitNewJob.bind(this)} showClient={this.state.showClient} />
                   {/* needs configurations passed in on click of single client in client roll*/}
               </div>

           )
       } else {
           this.props.fetchVendor(this.props.match.params.vendorId);
       }
    }
    render(){
        return (
            <div>
                {this.renderOrFetchFirst()}
            </div>
        );
    }
}

export default connect(({vendor,client}) => ({vendor,client}),actions)(SingleVendorView);
