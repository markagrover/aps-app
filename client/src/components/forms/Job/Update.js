import React from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from 'react-redux';
import * as actions from '../../../actions';

import Input from "react-toolbox/lib/input/Input";
import Button from "react-toolbox/lib/button/Button";
import Dropdown from "react-toolbox/lib/dropdown/Dropdown";

const renderInputField = ({ input, meta, ...props }) => (
    <Input
        { ...input }
        { ...props }
        error={ meta.touched && meta.error } />
);

let UpdateJob = () => (
    <form style={{
        width: '50%',
        margin: '0 auto'
    }} className={'row'}>
        <div>
            <Field name="type" component={renderInputField} label="Job Type" />
        </div>
        <div>
            <Field name="location" component={renderInputField} label="Job Location"/>
        </div>
        <div>
            <Field name="startDate" component={renderInputField} label="Start Date"/>
        </div>
        <div>
            <Button icon='send' label='Submit' raised primary type="submit"/>
        </div>
    </form>
);

UpdateJob = reduxForm({
    form: "updateJob"
})(UpdateJob);

export default connect(({editJob}) => ({initialValues: editJob}),actions)(UpdateJob);
