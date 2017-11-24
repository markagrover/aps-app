import { FETCH_VENDOR } from "../actions/types";

export default function(state = null, action) {
    console.log(action);
    switch (action.type) {
        case FETCH_VENDOR:
            return action.payload.data || false;
        default:
            return state;
    }
}
