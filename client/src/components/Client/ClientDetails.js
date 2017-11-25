import React from 'react';
import NewJobForm from '../forms/Job/New';
import JobRoll from '../Jobs/JobRoll';

const Details = ({fName,lName,address,phone,email}) => {
    return (
      <div>
          <p>Client Name: <span>{`${fName} ${lName}`}</span> </p>
          <p>EMAIL: <span>{`${email}`}</span> </p>
          <p>PHONE: <span>{`${phone}`}</span> </p>
          <p>Address: <span>{`${address.houseNumber} ${address.street} ${address.city}, ${address.state}`}</span> </p>
      </div>
    );
}
