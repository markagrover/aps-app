import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import auth from "./authReducer";
import clients from "./clientsReducer";
import editClient from "./editClientReducer";
import vendors from "./vendorsReducer";
import editVendor from "./editVendorReducer";
import editJob from "./editJobReducer";
import vendor from "./vendorReducer";
import client from "./clientReducer";
import job from "./jobReducer";
import jobs from "./jobsReducer";

export default combineReducers({
    job,
    jobs,
    vendor,
    vendors,
    editClient,
    editVendor,
    editJob,
    client,
    clients,
    auth,
  form: reduxForm
});
