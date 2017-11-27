import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Button from'react-toolbox/lib/button/Button';
import Client from '../components/Client/ClientDetails';

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
        console.log("VendorId",e.target.dataset.vid);
        console.log("VendorId",e.target.dataset.cid);
        const vid = e.target.dataset.vid;
        const cid = e.target.dataset.cid;
        await this.props.fetchVendor(vid);
        this.props.history.push(`/vendors/${vid}?showClient=true&clientId=${cid}`);
    }
    renderClients(){
        if(this.props.clients){
          return this.props.clients.map((client, i) => {
                return (
                    <div key={i}>
                        <Client {...client} actions={{
                            view: <Button onClick={this.onViewClient.bind(this) }  data-cid={client._id} data-vid={client.vendor} label={'VIEW CLIENT'}/>
                        }}/>
                    </div>

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
