import React, { Component } from 'react';
import Card from 'react-toolbox/lib/card/Card';
import Button from 'react-toolbox/lib/button/Button';
import CardTitle from 'react-toolbox/lib/card/CardTitle';
import CardText from 'react-toolbox/lib/card/CardText';
import EditJobForm from '../forms/Job/Update';

class Job extends Component {
    renderEditForm(){
        if(this.props.showEditForm){
            return (
                <EditJobForm onSubmit={this.props.submitEditClient}/>
            )
        }
    }
    render(){
        const {_id, address, type, createdDate, completed, startDate} = this.props.job;
        const {houseNumber, street, city, state, zipcode} = address;
        return (
            <Card>
                <CardTitle
                    title={type}
                    subtitle={startDate}
                />
                <CardText>
                    <p>Location of Job: {`${houseNumber} ${street} ${city} ${state}, ${zipcode}`}</p>
                    <p>Created On: {`${createdDate}`}</p>
                    <p>Completed: {`${completed}`}</p>

                    <h3>If there were noted and images , Price and Paid or Not will all be here..</h3>
                    <h4>Also will have send email button, Navigation, and other cool features.</h4>
                    <Button data-id={_id} onClick={this.props.editJob.bind(this)} label={"Edit"}/>
                    <Button data-id={_id} onClick={this.props.deleteJob.bind(null, _id)} label={"Delete"}/>
                </CardText>
            </Card>
        );

    }
}

export default Job;
