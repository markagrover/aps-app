import { FETCH_TEST } from "../actions/types";

export default function(state = null, action) {
  console.log(action);
  switch (action.type) {
    case FETCH_TEST:
      return action.payload.data || false;
    default:
      return state;
  }
}
