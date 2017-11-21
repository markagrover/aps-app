import axios from 'axios';
import { FETCH_TEST, FETCH_TODOS, FETCH_USER } from './types';

export const fetchUser = () => async dispatch => dispatch({ type: FETCH_USER, payload: await axios.get('/api/current_user') });


export const fetchTest = () => {
    return async dispatch => {
        const res = await axios.get('/api/test');
        console.log(res);
        return dispatch({ type: FETCH_TEST, payload: res.data });
    }
};

export const fetchTodos = () => {
    return async dispatch => {
        const res = await axios.get('/api/todos');
        console.log("res",res);
        return dispatch({ type: FETCH_TODOS, payload: res });
    }
};
