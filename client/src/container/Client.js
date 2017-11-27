import React, { Component } from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';
import Button from 'react-toolbox/lib/button/Button';
import NewJobForm from '../components/forms/Job/New';
import JobRoll from '../components/Jobs/JobRoll';
import Client from '../components/Client/ClientDetails';


class SingleClientView extends Component {
    state = {
        jobs: []
    };
    renderClientDetails(){
        if(this.props.client){
            let client = this.props.client;
            return (
                <div>
                    <Client {...client} actions={{
                        edit:<Button data-id={client._id} icon='edit' label='EDIT' flat primary />,
                        delete:<Button data-id={client._id} icon='delete' label='DELETE' flat primary />,
                    }} />
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
