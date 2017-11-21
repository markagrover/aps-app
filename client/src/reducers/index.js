import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import test from "./testReducer";
import todos from "./todosReducer";
import auth from "./authReducer";

export default combineReducers({
  auth: auth,
  todos: todos,
  test: test,
  form: reduxForm
});
