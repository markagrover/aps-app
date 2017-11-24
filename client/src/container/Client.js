import React, { Component } from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';
import Button from 'react-toolbox/lib/button/Button';


class SingleClientView extends Component {
    state = {
        jobs: []
    };
    renderClientDetails(){
        if(this.props.client){
            let client = this.props.client;
            return (
                <div>
                    <li style={{
                        border: '1px solid black',
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
                        <Button data-id={client._id} icon='edit' label='EDIT' flat primary />
                        <Button data-id={client._id} icon='delete' label='DELETE' flat primary />
                    </li>
                </div>

            )
        } else {
            this.props.fetchClient(this.props.match.params.clientId);
        }
    }

    render(){
        return (
          <div>
                <h2>Client View</h2>
              {this.renderClientDetails()}
          </div>
        );
    }
}

export default connect(({client}) => ({client}),actions)(SingleClientView);
