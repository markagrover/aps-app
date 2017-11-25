import React, { Component } from 'react';

class ClientRoll extends Component {
    state = {
        clients: []
    };
    renderClients(){
        if(this.props.showClient){
            this.props.clients.map((client, i) => {
                return (
                    <li key={i}>{client.fName}</li>
                );
            })
        }

    }
    render(){
            return (
                <div>
                    {this.renderClients()}
                </div>
            )
    }
}

export default ClientRoll;
