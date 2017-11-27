import React, { Component } from "react";
import NewJobForm from "../forms/Job/New";
import NewClientForm from "../forms/Client/New";
import EditClientForm from "../forms/Client/Update";
import EditJobForm from "../forms/Job/Update";
import JobRoll from "../Jobs/JobRoll";
import Button from "react-toolbox/lib/button/Button";
import Card from "react-toolbox/lib/card/Card";
import CardTitle from "react-toolbox/lib/card/CardTitle";
import CardText from "react-toolbox/lib/card/CardText";
import CardActions from "react-toolbox/lib/card/CardActions";
import Job from "../Jobs/job";

class ShowClient extends Component {
    showJob(){
        if (this.props.showJob) {
            return <Job deleteJob={this.props.deleteJob} showEditForm={this.props.editJob} editJob={this.props.onToggleEditJob} job={this.props.job} />;
        }
    };
    showForms(){
        console.log('PROPS-->',this.props);
        if (this.props.addJob) {
            return <NewJobForm onSubmit={this.props.newJobSubmit} />;
        }
        if (this.props.editJob) {
            return <EditJobForm onSubmit={this.props.editJobSubmit} />;
        }
        if (this.props.addClient) {
            return <NewClientForm onSubmit={this.props.newClientSubmit} />;
        }
        if (this.props.editClient) {
            return <EditClientForm onSubmit={this.props.editClientSubmit} />;
        }
    };

  render() {

    const label = !this.props.addJob ? "ADD JOB" : "CANCEL";
    const isHidden = this.props.addJob ? {display: 'none'} : {};
    if (this.props.showClient) {
      const { fName, lName, address, phone, email, _id } = this.props.client;
      return (
        <Card style={{ width: "80%" }}>
          <CardTitle title={`${fName} ${lName}`} subtitle={`${email}`} />
          <CardText style={isHidden}>

            <p>
              PHONE: <span>{`${phone}`}</span>
            </p>
            <p>
              Address:
              <span
              >{`${address.houseNumber} ${address.street} ${address.city}, ${address.state}`}</span>
            </p>
          </CardText>
          <CardTitle style={isHidden} subtitle={`Jobs`} />
          <CardText style={isHidden}>
            <JobRoll
              getJob={this.props.getJob}
              showJobs={this.props.showJobs}
              jobs={this.props.client.jobs}
            />
          </CardText>
          <CardActions>
            <Button data-id={_id} label={label} onClick={this.props.onAddJob} />
            <Button label={"DELETE Client"} onClick={this.props.deleteClient.bind(this, _id)} />
            <Button data-id={_id} label={"Edit Client"} onClick={this.props.onToggleEditClient.bind(this)} />
          </CardActions>
          {this.showJob()}
          {this.showForms()}
        </Card>
      );
    } else {
        return (
            <div>
                {this.showForms()}
            </div>
        );
    }
  }
}

export default ShowClient;
