import React from 'react';
import NewJobForm from '../forms/Job/New';
import JobRoll from '../Jobs/JobRoll';
import Button from 'react-toolbox/lib/button/Button';
import Card from 'react-toolbox/lib/card/Card';
import CardTitle from 'react-toolbox/lib/card/CardTitle';
import CardText from 'react-toolbox/lib/card/CardText';
import CardActions from 'react-toolbox/lib/card/CardActions';
import Job from '../Jobs/job';
const showAddJobForm = (props) => {
    if(props.addJob){
        return (
            <NewJobForm onSubmit={props.newJobSubmit} />
        )
    }
}

const showJob = (props) => {
    console.log("JOB=>",props);
    if(props.showJob){
        return (
            <Job job={props.job} />
        )
    }
}


const showClient = (props) => {
const label = !props.addJob ? "ADD JOB" : "CANCEL";
    if(props.showClient){
        console.log("PROPS=>",props);
        const {fName,lName,address,phone,email, _id} = props.client;
        return (
            <Card style={{width: '80%'}}>
                <CardTitle
                    title={`${fName} ${lName}`}
                    subtitle={`${email}`}
                />
                <CardText>
                    <p>PHONE: <span>{`${phone}`}</span> </p>
                    <p>Address: <span>{`${address.houseNumber} ${address.street} ${address.city}, ${address.state}`}</span> </p>
                </CardText>
                <CardTitle
                    subtitle={`Jobs`}
                />
                <CardText>
                    <JobRoll getJob={props.getJob} showJobs={props.showJobs} jobs={props.client.jobs} />
                </CardText>
                <CardActions>
                    <Button data-id={_id} label={label} onClick={props.onAddJob} />
                </CardActions>
                {showJob(props)}
                {showAddJobForm(props)}
            </Card>

        )
    }
}

const Client = (props) => {
    return (
      <div>
          {showClient(props)}
      </div>
    );
};

export default Client;
