import React, { Component } from 'react';
import VendorForm from '../components/forms/Vendor/New';
import * as actions from '../actions';
import { connect } from 'react-redux';

class NewVendor extends Component {

   async submit(values){
        await this.props.createVendor(values);
        this.props.history.push('/vendors');
    }
    render(){
        return (
          <div>
              <VendorForm onSubmit={this.submit.bind(this)}/>
          </div>
        );
    }
}

export default connect(null, actions)(NewVendor);
