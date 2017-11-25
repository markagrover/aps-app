import React, { Component } from 'react';
import Card from 'react-toolbox/lib/card/Card';
import CardTitle from 'react-toolbox/lib/card/CardTitle';
import CardText from 'react-toolbox/lib/card/CardText';

class Job extends Component {

    render(){
        const {address, type, createdDate, completed, startDate} = this.props.job;
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
                </CardText>
            </Card>
        );

    }
}

export default Job;
