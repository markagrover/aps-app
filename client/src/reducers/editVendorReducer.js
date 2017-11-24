import { EDIT_VENDOR } from "../actions/types";

export default function(state = null, action) {
    console.log(action);
    switch (action.type) {
        case EDIT_VENDOR:
            return action.payload || false;
        default:
            return state;
    }
}
