import React, { Component } from 'react';

class JobRoll extends Component {
    state = {
        jobs: []
    };

    renderJobs(){
        if(this.props.showJobs){
           return this.props.jobs.map((job, i) => {
                return (
                    <li>{job.type}</li>
                );
            })
        }

    }

    render(){
            return (
                <div>
                    {this.renderJobs()}
                </div>
            );

    }
}

export default JobRoll;
