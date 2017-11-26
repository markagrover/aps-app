import { EDIT_JOB } from "../actions/types";

export default function(state = null, action) {
    console.log(action);
    switch (action.type) {
        case EDIT_JOB:
            return action.payload || false;
        default:
            return state;
    }
}
