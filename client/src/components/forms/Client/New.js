import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import * as actions from "../../../actions";
import { connect } from "react-redux";
import Input from "react-toolbox/lib/input/Input";
import Button from "react-toolbox/lib/button/Button";
import Dropdown from "react-toolbox/lib/dropdown/Dropdown";

const renderInputField = ({ input, meta, ...props }) => (
  <Input {...input} {...props} error={meta.touched && meta.error} />
);

const renderSelectField = ({ input, meta, source, ...props }) => (
  <Dropdown /*due to Dropdowns required proptype for error is String huh....*/
    source={source}
    {...input}
    {...props}
    error={"" && meta.touched && meta.error}
  />
);

class NewClient extends Component {
  state = { vendors: []};
  async componentWillMount() {
    await this.props.fetchVendors();
    const vendors = this.props.vendors.map(vendor => ({
      value: vendor._id,
      label: vendor.company
    }));
    this.setState({ vendors });
  }

  renderForm() {
      return (
        <form onSubmit={this.props.handleSubmit((values) => this.props.onSubmit(values))}
          style={{
            width: "50%",
            margin: "0 auto"
          }}
          className={"row"}
        >
          <div>
            <Field
              name="fName"
              component={renderInputField}
              label="First Name"
            />
          </div>
          <div>
            <Field
              name="lName"
              component={renderInputField}
              label="Last Name"
            />
          </div>
          <div>
            <Field
                name="email"
                component={renderInputField}
                label="Email" />
          </div>
          <div>
            <Field
                name="phone"
                component={renderInputField}
                label={"Phone"} />
          </div>
          <div>
            <Field
              name="houseNumber"
              component={renderInputField}
              label={"House Number"}
            />
          </div>
          <div>
            <Field
              name="street"
              component={renderInputField}
              label={"Street"}
            />
          </div>
          <div>
            <Field
                name="city"
                component={renderInputField}
                label={"City"} />
          </div>
          <div>
            <Field
                name="state"
                component={renderInputField}
                label={"State"} />
          </div>
          <div>
            <Field
              name="zipcode"
              component={renderInputField}
              label={"Postal Code"}
            />
          </div>
          <div>
            <Field
              name="vendor"
              source={this.state.vendors}
              component={renderSelectField}
              label={"Vendor Rel"}
            />
          </div>
          <div>
            <Button
                icon="send"
                label="Submit"
                raised
                primary
                type="submit" />
          </div>
        </form>
      );
    }

  render() {
    return <div>{this.renderForm()}</div>;
  }
}

export default connect(({ vendors }) => ({ vendors }), actions)(
  reduxForm({
    form: "newClient"
  })(NewClient)
);
