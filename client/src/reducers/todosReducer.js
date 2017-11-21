import { FETCH_TODOS } from "../actions/types";

export default function(state = null, action) {
  console.log(action);
  switch (action.type) {
    case FETCH_TODOS:
      return action.payload.data || false;
    default:
      return state;
  }
}
