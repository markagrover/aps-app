import React, { Component } from 'react';
import JobForm from '../components/forms/Job/New';
import axios from 'axios';

class NewJob extends Component {

   async submit(values){
        console.log("VALUES=>",values);
        const res = await axios.post('/api/clients',values);
        console.log(res);
    }
    render(){
        return (
            <div>
                <JobForm onSubmit={this.submit}/>
            </div>
        );
    }
}

export default NewJob;
