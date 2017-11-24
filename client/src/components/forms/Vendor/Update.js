import React from "react";
import { reduxForm, Field } from "redux-form";
import Input from "react-toolbox/lib/input/Input";
import Button from "react-toolbox/lib/button/Button";
import Dropdown from "react-toolbox/lib/dropdown/Dropdown";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import axios from 'axios';

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
const vendorSource = async () => {
  const res = await axios.get('/api/vendors');
  console.log("RES=>",res);
  return res.data.map((vendor) => ({value: vendor._id, label: vendor.company}));
}
// vsRequest();
// const vendorSource = [
//   { value: "none", label: "NONE" },
//   { value: "apollo", label: "APOLLO" },
//   { value: "pnp", label: "POOL_N_PLAY" },
//   { value: "pplus", label: "POOLS_PLUS" }
// ];

let UpdateVendor = () => (
  <form
    style={{
      width: "50%",
      margin: "0 auto"
    }}
    className={"row"}
  >
    <div>
      <Field name="company" component={renderInputField} label="Company" />
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
      <Field name="phone" component={renderInputField} label="Phone" />
    </div>
    <div>
      <Field name="email" component={renderInputField} label="Email" />
    </div>
    <div>
      <Field name="website" component={renderInputField} label="WebSite" />
    </div>
    <div>
      <Button icon="send" label="Submit" raised primary type="submit" />
    </div>
  </form>
);

UpdateVendor = reduxForm({
  form: "newVendor"
})(UpdateVendor);

export default connect(
  ({ editVendor }) => ({ initialValues: editVendor }),
  actions
)(UpdateVendor);
