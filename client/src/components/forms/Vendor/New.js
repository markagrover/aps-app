import React from "react";
import { reduxForm, Field } from "redux-form";

import Input from "react-toolbox/lib/input/Input";
import Button from "react-toolbox/lib/button/Button";
import Dropdown from "react-toolbox/lib/dropdown/Dropdown";

const renderInputField = ({ input, meta, ...props }) => (
    <Input
        { ...input }
        { ...props }
        error={ meta.touched && meta.error } />
);


let NewVendor = (props) => {
    const { handleSubmit, onSubmit} = props;

   return ( <form onSubmit={handleSubmit((values) => onSubmit(values))} style={{
        width: '50%',
        margin: '0 auto'
    }} className={'row'}>
        <div>
            <Field name="company" component={renderInputField} label="Company"/>
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
               label={"City"}
           />
       </div>
       <div>
           <Field
               name="state"
               component={renderInputField}
               label={"State"}
           />
       </div>
       <div>
           <Field
               name="zipcode"
               component={renderInputField}
               label={"Postal Code"}
           />
       </div>
        <div>
            <Field name="phone" component={renderInputField} label="Phone"/>
        </div>
        <div>
            <Field name="email" component={renderInputField} label="Email"/>
        </div>
        <div>
            <Field name="website" component={renderInputField} label="WebSite"/>
        </div>

        <div>
            <Button icon='send' label='Submit' raised primary type="submit"/>
        </div>
    </form>);
};

NewVendor = reduxForm({
    form: "newVendor"
})(NewVendor);

export default NewVendor;
