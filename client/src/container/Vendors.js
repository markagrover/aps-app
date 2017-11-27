import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Button from'react-toolbox/lib/button/Button';
import NewVendorForm from '../components/forms/Vendor/New';
import EditVendorForm from '../components/forms/Vendor/Update';

class Vendors extends Component {
    state = {
        showNewVendorForm: false,
        showEditVendorForm: false
    };
    componentWillMount(){
        this.props.fetchVendors();
    }
    async onEdit(e){
        const target = e.target.dataset.id;
        await this.props.editVendor(target);
        this.props.history.push(`/vendors/edit/${target}`);

    }
    async onViewVendor(e){
        const target = e.target.dataset.id;
        await this.props.fetchVendor(target);
        this.props.history.push(`/vendors/${target}`);
    }
    async submitNewVendor(values) {
        await this.props.createVendor(values);
        this.props.fetchVendors();
        this.toggleAddVendor();
        //this.props.history.push('/vendors');
    }
     async submitEditVendor(values) {
        const {_id,company,houseNumber, street ,city,state,zipcode,phone, email, website} = values;
        let newVals = {_id,company,phone,email,website};
        newVals.address = {houseNumber, street ,city,state,zipcode};
        await this.props.updateVendor(newVals);
        this.props.fetchVendors();
         this.setState({
             showEditVendorForm: !this.state.showEditVendorForm
         });
        //this.props.history.push('/vendors');
    }
    async onDelete(e){
       const id = e.target.dataset.id;
       await this.props.deleteVendor(id);
       this.props.fetchVendors();
    }
    toggleAddVendor(){
        this.setState({
            showNewVendorForm: !this.state.showNewVendorForm
        });
    }

    async toggleEditVendor(e){
        const id = e.target.dataset.id;
        if(!this.state.showEditVendorForm){
            await this.props.editVendor(id);
        }
        this.setState({
            showEditVendorForm: !this.state.showEditVendorForm
        });
    }
    renderNewVendorForm(){
        if(this.state.showNewVendorForm){
            return (
                <div>
                    <NewVendorForm onSubmit={this.submitNewVendor.bind(this)}/>
                </div>

            )
        }
        if(this.state.showEditVendorForm){
            return (
                <div>
                    <EditVendorForm onSubmit={this.submitEditVendor.bind(this)}/>
                </div>

            )
        }
    }
    renderVendors(){
        if(this.props.vendors){
            return this.props.vendors.map((vendor, i) => {
                return (
                    <li key={i} style={{
                        border: '1px solid black',
                        borderRadius: '10px',
                        padding: '10px',
                        margin: '10px',
                        listStyle: 'none'
                    }}>
                        <p>Company Name: {vendor.company}</p>
                        <p>Vendor Email: {vendor.email}</p>
                        <p>Vendor Phone: {vendor.phone}</p>
                        <p>Vendor WebSite: {vendor.website}</p>
                        <p>Vendor Address: {`${vendor.address.houseNumber} ${vendor.address.street} ${vendor.address.city}, ${vendor.address.state}`}</p>
                        <Button onClick={this.toggleEditVendor.bind(this)} data-id={vendor._id} icon='edit' label='EDIT' flat primary />
                        <Button onClick={this.onDelete.bind(this)} data-id={vendor._id} icon='delete' label='DELETE' flat primary />
                        <Button onClick={this.onViewVendor.bind(this) } data-id={vendor._id} label={'VIEW VENDOR'}/>
                    </li>
                );
            })
        }

    }
    render() {
        return (
            <div>
                <h2>Vendors</h2>
                <Button onClick={this.toggleAddVendor.bind(this)} label={'Add Vendor'} />
                {this.renderNewVendorForm()}
                <ul>
                    {this.renderVendors()}
                </ul>
            </div>

        );
    }
}

function mapStateToProps({vendors}) {
    return {
        vendors
    };
}

export default connect(mapStateToProps, actions)(Vendors);
