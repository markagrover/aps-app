import axios from 'axios';
import { FETCH_TEST, FETCH_TODOS, FETCH_USER, FETCH_CLIENTS, FETCH_CLIENT, DELETE_CLIENT, UPDATE_CLIENT, CREATE_CLIENT , EDIT_CLIENT, CREATE_VENDOR, FETCH_VENDORS, EDIT_VENDOR, FETCH_VENDOR, CREATE_JOB} from './types';

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

export const fetchClient = (id) => {
    return async dispatch => {
        const res = await axios.get(`/api/clients/${id}`);
        console.log("res fetch client",res);
        return dispatch({ type: FETCH_CLIENT, payload: res.data });
    }
};

export const fetchClients = () => {
    return async dispatch => {
        const res = await axios.get('/api/clients');
        console.log("res",res);
        return dispatch({ type: FETCH_CLIENTS, payload: res });
    }
};

export const createClient = (values) => {
    let {fName, lName, email, city, phone, houseNumber,vendor, street, state, zipcode} = values;
    const newClient = {
        fName: fName,
        lName: lName,
        phone: phone,
        email: email,
        vendor : vendor,
        address: {
           houseNumber: houseNumber,
            street: street,
            city: city,
            state: state,
            zipcode: zipcode
        }
    };

    return async dispatch => {
        const res = await axios.post('/api/clients', newClient);
        console.log("res",res);
        return dispatch({ type: CREATE_CLIENT, payload: res });
    }
};

export const editClient = (id) => {
    return async dispatch => {
        const res = await axios.get(`/api/clients/${id}`);
        console.log("res",res);
        let {fName,lName,email,phone,address} = res.data;
        let {houseNumber, street, city, state, zipcode} = address;
        const editValue = {fName,lName,email,phone, houseNumber, street, city, state, zipcode};
        return dispatch({ type: EDIT_CLIENT, payload: editValue });
    }
};

export const updateClient = (values, id) => {
    return async dispatch => {
        const res = await axios.get('/api/clients');
        console.log("res",res);
        return dispatch({ type: UPDATE_CLIENT, payload: res });
    }
};

export const deleteClient = (id) => {
    return async dispatch => {
        const res = await axios.delete('/api/clients',id);
        console.log("res",res);
        return dispatch({ type: DELETE_CLIENT, payload: res });
    }
};

export const createJob = (vendorId, clientId, values) => {
    let requestData = {};
    const {type, startDate, houseNumber, street, city, state, zipcode} = values;
    requestData.job = {
        type,
        startDate
    };
    requestData.job.address = { houseNumber, street, city, state, zipcode};
    return async dispatch => {
        const clientRes = await axios.post(`/api/vendors/${vendorId}/clients/${clientId}/jobs`, requestData);
        const vendorRes = await axios.get(`/api/vendors/${vendorId}`);
        console.log("clientRes",clientRes);
        fetchVendor(vendorId);
        return dispatch({ type: CREATE_JOB, payload: clientRes });


    }
};

export const editJob = (id) => {
    return async dispatch => {
        const res = await axios.get(`/api/jobs/${id}`);
        console.log("res",res);
        return dispatch({ type: EDIT_CLIENT, payload: res });
    }
};

export const updateJob = (values, id) => {
    return async dispatch => {
        const res = await axios.get('/api/jobs');
        console.log("res",res);
        return dispatch({ type: UPDATE_CLIENT, payload: res });
    }
};

export const deleteJob = (id) => {
    return async dispatch => {
        const res = await axios.delete('/api/jobs',id);
        console.log("res",res);
        return dispatch({ type: DELETE_CLIENT, payload: res });
    }
};

export const createVendor = (values) => {
    let {company, email, phone, website,houseNumber, street, city, state, zipcode} = values;
    let address = {
        houseNumber, street, city, state, zipcode
    };
    const data = {
        company, email, phone, website,
        address
    };
    return async dispatch => {
        const res = await axios.post('/api/vendors', data);
        console.log("res",res);
        return dispatch({ type: CREATE_VENDOR, payload: res });
    }
};

export const fetchVendors = () => {
    return async dispatch => {
        const res = await axios.get('/api/vendors');
        console.log("res",res);
        return dispatch({ type: FETCH_VENDORS, payload: res });
    }
}


export const editVendor = (id) => {
    return async dispatch => {
        const res = await axios.get(`/api/vendors/edit/${id}`);
        console.log("response",res);
        let {company,email,phone,address,website} = res.data;
        let {houseNumber, street, city, state, zipcode} = address;
        const editValue = {company,email,phone, houseNumber, street, city, state, zipcode, website};
        return dispatch({ type: EDIT_VENDOR, payload: editValue });
    }
}

export const fetchVendor = (id) => {
    return async dispatch => {
        const res = await axios.get(`/api/vendors/${id}`);
        return dispatch({type: FETCH_VENDOR, payload: res});
    }
}








