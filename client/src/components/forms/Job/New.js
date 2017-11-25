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

const renderSelectField = ({ input, meta, source, ...props }) => (
    <Dropdown /*due to Dropdowns required proptype for error is String huh....*/
        source={source}
        {...input}
        {...props}
        error={"" && meta.touched && meta.error}
    />
);

let NewJob = (props) => {
    const {handleSubmit, onSubmit} = props;

   return (<form onSubmit={handleSubmit((values) => onSubmit(values))} style={{
        width: '50%',
        margin: '0 auto'
    }} className={'row'}>
        <div>
            <Field name="type" source={[{label:'Above Ground Round', value: 1}, {label: 'Above Ground Oval',value: 2},{label: 'Semi-In-ground Round', value: 3},{label: 'Semi-In-ground FreeForm',value: 4}, {label: 'Semi-In-ground Oval', value: 5}, {label: 'Semi-In-ground Rectangle',value: 6}, {label: 'In-ground Rectangle', value: 7}, {label: 'In-ground FreeForm', value: 8},{label: 'Liner Replacement Above Ground', value: 9}, {label: 'Liner Replacement In-Ground',value: 10}, {label: 'Liner Replacement Semi-In-ground', value: 11}]} component={renderSelectField} label="Job Type"/>
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
            <Field name="startDate" component={renderInputField} label="Start Date"/>
        </div>

        <div>
            <Button icon='send' label='Submit' raised primary type="submit"/>
        </div>
    </form>);
};

NewJob = reduxForm({
    form: "newJob"
})(NewJob);

export default NewJob;
