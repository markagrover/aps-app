import { FETCH_JOB } from "../actions/types";

export default function(state = null, action) {
    console.log(action);
    switch (action.type) {
        case FETCH_JOB:
            return action.payload.data || false;
        default:
            return state;
    }
}
