import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Button from'react-toolbox/lib/button/Button';

class Clients extends Component {
    componentWillMount(){
        this.props.fetchClients();
    }
    async onEdit(e){
        const id = e.target.dataset.id;
        await this.props.editClient(id);
        this.props.history.push(`/clients/edit/${id}`);

    }
    async onDelete(e){
         const id = e.target.dataset.id;
         await this.props.deleteClient(id);
         this.props.fetchClients();
    }
    async onViewClient(e){
        const id = e.target.dataset.id;
        await this.props.fetchClient(id);
        this.props.history.push(`/clients/${id}`);
    }
    renderClients(){
        if(this.props.clients){
          return this.props.clients.map((client, i) => {
                return (
                    <li key={i} style={{
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

                        <Button onClick={this.onEdit.bind(this)} data-id={client._id} icon='edit' label='EDIT' flat primary />
                        <Button onClick={this.onDelete.bind(this)} data-id={client._id} icon='delete' label='DELETE' flat primary />
                        <Button onClick={this.onViewClient.bind(this) } data-id={client._id} label={'VIEW CLIENT'}/>

                    </li>
                );
            })
        }

    }
    render() {
       return (
           <div>
               <h2>Clients</h2>
               <ul>
                   {this.renderClients()}
               </ul>
           </div>

       );
    }
}

function mapStateToProps({clients}) {
    return {
        clients
    };
}

export default connect(mapStateToProps, actions)(Clients);
