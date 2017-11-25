import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import auth from "./authReducer";
import clients from "./clientsReducer";
import editClient from "./editClientReducer";
import vendors from "./vendorsReducer";
import editVendor from "./editVendorReducer";
import vendor from "./vendorReducer";
import client from "./clientReducer";
import job from "./jobReducer";

export default combineReducers({
    job,
    vendor,
    vendors,
    editClient,
    editVendor,
    client,
    clients,
    auth,
  form: reduxForm
});
