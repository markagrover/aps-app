import React from 'react';

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
