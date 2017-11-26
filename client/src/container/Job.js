import React, { Component } from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';

class SingleJobView extends Component {
    state = {
        jobs: []
    };
    renderJobDetails(){
        if(this.props.job){
            let job = this.props.job;
            return (
                <div>
                    <li style={{
                        border: '1px solid black',
                        borderRadius: '10px',
                        padding: '10px',
                        margin: '10px',
                        listStyle: 'none'
                    }}>
                        <p>Type {job.type}</p>

                    </li>
                </div>

            )
        } else {
            this.props.fetchJob(this.props.match.params.jobId);
        }
    }

    render(){
        return (
            <div>
                <h2>Job View</h2>
                {this.renderJobDetails()}
            </div>
        );
    }
}

export default connect(({job}) => ({job}),actions)(SingleJobView);
