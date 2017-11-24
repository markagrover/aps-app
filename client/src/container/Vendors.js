import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Button from'react-toolbox/lib/button/Button';

class Vendors extends Component {
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
    onDelete(e){
        console.log('ID=>',e.target.dataset.id);
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
                        <Button onClick={this.onEdit.bind(this)} data-id={vendor._id} icon='edit' label='EDIT' flat primary />
                        <Button onClick={this.onDelete} data-id={vendor._id} icon='delete' label='DELETE' flat primary />
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
