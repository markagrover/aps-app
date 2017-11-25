import React from 'react';
import NewJobForm from '../forms/Job/New';
import JobRoll from '../Jobs/JobRoll';
import Button from 'react-toolbox/lib/button/Button';

const showAddJobForm = (props) => {
    const submit = (values) => {
        props.submit(values);
    }

    if(props.addJob){
        return (
            <NewJobForm onSubmit={props.newJobSubmit} />
        )
    }
}

const showClient = (props) => {

    if(props.showClient){
        console.log("PROPS=>",props);
        const {fName,lName,address,phone,email, _id} = props.client;
        return (
            <div>
                <div>
                    <p>Client Name: <span>{`${fName} ${lName}`}</span> </p>
                    <p>EMAIL: <span>{`${email}`}</span> </p>
                    <p>PHONE: <span>{`${phone}`}</span> </p>
                    <p>Address: <span>{`${address.houseNumber} ${address.street} ${address.city}, ${address.state}`}</span> </p>
                    <Button data-id={_id} label={"add Job"} onClick={props.onAddJob} />
                </div>
                {showAddJobForm(props)}
                <JobRoll showJobs={props.showJobs} jobs={props.client.jobs} />
            </div>

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
