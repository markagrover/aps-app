import React, { Component } from 'react';
import List from 'react-toolbox/lib/list/List';
import ListSubheader from 'react-toolbox/lib/list/ListSubHeader';
import ListItem from 'react-toolbox/lib/list/ListItem';
import ListDivider from 'react-toolbox/lib/list/ListDivider';

class JobRoll extends Component {
    state = {
        jobs: []
    };

    renderJobs(){
        if(this.props.showJobs){
           return this.props.jobs.map((job, i) => {
                return (
                    <ListItem
                        onClick={this.props.getJob.bind(null,job._id)}
                        selectable ripple key={i}
                        caption={job.type}
                        legend={job.startDate}
                    />
                );
            })
        }

    }

    render(){
            return (
                <List>
                    {this.renderJobs()}
                </List>
            );

    }
}

export default JobRoll;
