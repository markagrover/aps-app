import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import test from "./testReducer";
import todos from "./todosReducer";
import auth from "./authReducer";
import clients from "./clientsReducer";
import editClient from "./editClientReducer";
import vendors from "./vendorsReducer";
import editVendor from "./editVendorReducer";
import vendor from "./vendorReducer";
import client from "./clientReducer";

export default combineReducers({
    vendor,
    vendors,
    editClient,
    editVendor,
    client,
    clients,
  auth: auth,
  form: reduxForm
});
