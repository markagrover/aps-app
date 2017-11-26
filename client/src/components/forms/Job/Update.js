import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import * as actions from "../../../actions";
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

class EditJob extends Component {
  // async componentWillMount(){
  //     await this.props.fetchVendors();
  //     const vendors = this.props.vendors.map((vendor) => ({value: vendor._id, label: vendor.company}));
  //     this.setState({vendors});
  // }
  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(values =>
          this.props.onSubmit(values)
        )}
        style={{
          width: "50%",
          margin: "0 auto"
        }}
        className={"row"}
      >
        <div>
          <Field
            name="type"
            source={[
              { label: "Above Ground Round", value: "Above Ground Round" },
              {
                label: "Above Ground Oval",
                value: "Above Ground Oval"
              },
              { label: "Semi-In-ground Round", value: "Semi-In-ground Round" },
              {
                label: "Semi-In-ground FreeForm",
                value: "Semi-In-ground FreeForm"
              },
              { label: "Semi-In-ground Oval", value: "Semi-In-ground Oval" },
              {
                label: "Semi-In-ground Rectangle",
                value: "Semi-In-ground Rectangle"
              },
              { label: "In-ground Rectangle", value: "In-ground Rectangle" },
              {
                label: "In-ground FreeForm",
                value: "In-ground FreeForm"
              },
              {
                label: "Liner Replacement Above Ground",
                value: "Liner Replacement Above Ground"
              },
              {
                label: "Liner Replacement In-Ground",
                value: "Liner Replacement In-Ground"
              },
              {
                label: "Liner Replacement Semi-In-ground",
                value: "Liner Replacement Semi-In-ground"
              }
            ]}
            component={renderSelectField}
            label="Job Type"
          />
        </div>
        <div>
          <Field
            name="houseNumber"
            component={renderInputField}
            label={"House Number"}
          />
        </div>
        <div>
          <Field name="street" component={renderInputField} label={"Street"} />
        </div>
        <div>
          <Field name="city" component={renderInputField} label={"City"} />
        </div>
        <div>
          <Field name="state" component={renderInputField} label={"State"} />
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
            name="startDate"
            component={renderInputField}
            label="Start Date"
          />
        </div>

        <div>
          <Button icon="send" label="Submit" raised primary type="submit" />
        </div>
      </form>
    );
  }
}

export default connect(({ editJob }) => ({ initialValues: editJob }), actions)(
  reduxForm({
    form: "editJob"
  })(EditJob)
);
