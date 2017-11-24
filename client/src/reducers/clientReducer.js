import { FETCH_CLIENT } from "../actions/types";

export default function(state = null, action) {
    console.log(action);
    switch (action.type) {
        case FETCH_CLIENT:
            return action.payload.data || false;
        default:
            return state;
    }
}
