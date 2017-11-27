import React from 'react';
import NewJobForm from '../forms/Job/New';
import JobRoll from '../Jobs/JobRoll';
import Card from 'react-toolbox/lib/card/Card';
import CardActions from 'react-toolbox/lib/card/CardActions';
import CardText from 'react-toolbox/lib/card/CardText';

const createActions = ({actions}) => {
    const keys = Reflect.ownKeys(actions);
    return keys.map((key, i) => {
        return actions[key];
    });
};

const Details = (props) => {
    const {fName,lName,address,phone,email} = props;
    return (
      <Card>
          <CardText>
              <p>Client Name: <span>{`${fName} ${lName}`}</span> </p>
              <p>EMAIL: <span>{`${email}`}</span> </p>
              <p>PHONE: <span>{`${phone}`}</span> </p>
              <p>Address: <span>{`${address.houseNumber} ${address.street} ${address.city}, ${address.state}`}</span> </p>
          </CardText>
          <CardActions>
              {createActions(props)}
          </CardActions>
          </Card>
    );
};

export default Details;
