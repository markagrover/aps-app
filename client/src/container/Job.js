import React, { Component } from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';
import Card from 'react-toolbox/lib/card/Card';
import CardActions from 'react-toolbox/lib/card/CardActions';
import CardText from 'react-toolbox/lib/card/CardText';

class SingleJobView extends Component {
    constructor(props){
        super(props);

        this.renderJobDetails = this.renderJobDetails.bind(this);
        this.renderActions = this.renderActions.bind(this);
    }
    state = {
        jobs: []
    };
    renderActions(){
        if(this.props.actions){
            const {actions} = this.props;
            const keys = Reflect.ownKeys(actions);
            return keys.map((key,i) => {
                if(actions[key]){
                    return actions[key];
                }
            })
        }
    }
    renderJobDetails(){
        if(this.props.job){
            let job = this.props.job;
            return (
                <Card>
                    <CardText>
                        <p>Type {job.type}</p>
                        <p>Type {job.startDate}</p>
                        <p>Type {job.completed}</p>
                    </CardText>
                    <CardActions>
                        {this.renderActions()}
                    </CardActions>
                </Card>
            )
        } else {

        }
    }

    render(){
        return (
            <div>
                {this.renderJobDetails()}
            </div>
        );
    }
}

export default SingleJobView;
