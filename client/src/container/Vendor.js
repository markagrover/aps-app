import React, { Component } from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';
import Button from 'react-toolbox/lib/button/Button';

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

const ClientRoll = ({ clients }) => {
    return clients.map((client, i) => {
        return (
            <li key={i} style={{
                border: '1px dotted blue',
                borderRadius: '10px',
                padding: '10px',
                margin: '10px',
                listStyle: 'none'
            }}>
                <p>Client Name: {client.fName + ' ' + client.lName}</p>
                <p>Client Email: {client.email}</p>
                <p>Client Phone: {client.phone}</p>
                <p>Client Address: {`${client.address.houseNumber} ${client.address.street} ${client.address.city}, ${client.address.state}`}</p>
                <Button/>

            </li>
        )
    })
};


class SingleVendorView extends Component {
    state = {
        addClient: false,
        editClient: false,
        clients: []
    };

   renderOrFetchFirst(){
       if(this.props.vendor){
           return (
               <div>
                   <VendorDetails vendor={this.props.vendor.vendor}/>
                   <ClientRoll clients={this.props.vendor.clients} />
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

export default connect(({vendor}) => ({vendor}),actions)(SingleVendorView);
