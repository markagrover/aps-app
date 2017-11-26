import React, { Component } from "react";
import MGRouter from './Router';
import { connect } from "react-redux";
import * as actions from "../actions";
import MainLayout from '../components/layouts/MainLayout';
import { BrowserRouter } from 'react-router-dom';
import NewClientForm from '../container/NewClient';
import NewVendorForm from '../container/NewVendor';
import NewJobForm from '../container/NewJob';
import ClientsView from '../container/Clients';
import ClientView from '../container/Client';
import EditClientsView from '../components/forms/Client/Update';
import EditVendorsView from '../components/forms/Vendor/Update';
import EditJobView from '../components/forms/Job/Update';
import Vendors from '../container/Vendors';
import Jobs from '../container/Jobs';
import VendorView from '../container/Vendor';
import JobView from '../container/Job';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {
      this.props.fetchClients();
  }
  render() {
      // Add new routes here and pass in components.
    return (
      <BrowserRouter>
        <MainLayout
            MGRouter={
                <MGRouter
                    routes={{
                        "/": () => <h1>Landing...</h1>,
                        "/clients": ClientsView,
                        "/vendors": Vendors,
                        "/jobs": Jobs,
                        "/jobs/new": NewJobForm,
                        "/vendors/new": NewVendorForm,
                        "/clients/new": NewClientForm,
                        "/clients/:clientId": ClientView,
                        "/vendors/:vendorId": VendorView,
                        "/jobs/:jobId": JobView,
                        "/clients/edit/:clientId": EditClientsView,
                        "/jobs/edit/:jobId": EditJobView,
                        "/vendors/edit/:vendorId": EditVendorsView,}} />
            }/>
      </BrowserRouter>
    );
  }
}

export default connect(null, actions)(App);
