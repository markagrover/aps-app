import { FETCH_CLIENT } from "../actions/types";

export default function(state = null, action) {
    console.log(action);
    console.log("DATA=>",action.payload);
    switch (action.type) {
        case FETCH_CLIENT:
            return action.payload || false;
        default:
            return state;
    }
}
