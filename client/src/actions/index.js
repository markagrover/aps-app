import axios from 'axios';
import {
    FETCH_TEST,
    FETCH_USER,
    FETCH_CLIENT,
    EDIT_JOB,
    FETCH_VENDOR,
    FETCH_JOB,

    FETCH_TODOS,
    FETCH_CLIENTS,
    FETCH_VENDORS,
    FETCH_JOBS,

    CREATE_CLIENT,
    CREATE_VENDOR,
    CREATE_JOB,

    DELETE_CLIENT,
    DELETE_JOB,
    DELETE_VENDOR,

    UPDATE_CLIENT,
    UPDATE_VENDOR,
    UPDATE_JOB,

    EDIT_CLIENT,
    EDIT_VENDOR

} from './types';

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

/*
*
*    CLIENTS
*
* */

export const fetchClient = (id) => {
    return async dispatch => {
        const res = await axios.get(`/api/clients/${id}`);
        //console.log("res fetch client",res);
        return dispatch({ type: FETCH_CLIENT, payload: res.data });
    }
};

export const fetchClients = () => {
    return async dispatch => {
        const res = await axios.get('/api/clients');
        //console.log("res",res);
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
        //console.log("res",res);
        return dispatch({ type: CREATE_CLIENT, payload: res });
    }
};

export const editClient = (id) => {
    return async dispatch => {
        const res = await axios.get(`/api/clients/${id}`);
        //console.log("res",res);
        let {_id, fName,lName,email,phone,address} = res.data;
        let {houseNumber, street, city, state, zipcode} = address;
        const editValue = {_id, fName,lName,email,phone, houseNumber, street, city, state, zipcode};
        return dispatch({ type: EDIT_CLIENT, payload: editValue });
    }
};

export const updateClient = (values) => {
    return async dispatch => {
        const {fName, lName, email, phone, houseNumber, street,city,state,zipcode} = values;
        const newVals = {fName, lName, email, phone};
        newVals.address = {houseNumber, street,city,state,zipcode};
        console.log("values updating client ",newVals);
        const res = await axios.put(`/api/clients/${values._id}`, newVals);
        console.log("res updating client",res.data);
        return dispatch({ type: UPDATE_CLIENT, payload: res.data });
    }
};

export const deleteClient = (id) => {
    return async dispatch => {
        const res = await axios.delete(`/api/clients/${id}`);
        //console.log("res",res);
        return dispatch({ type: DELETE_CLIENT, payload: res.data });
    }
};


/*
*
*    JOBS
*
* */

export const createJob = (vendorId, clientId, values) => {
    let requestData = {};
    const {type, startDate, houseNumber, street, city, state, zipcode} = values;
    requestData.job = {
        type,
        startDate
    };
    requestData.job.address = { houseNumber, street, city, state, zipcode};
    //console.log("req.body.job=>>>",requestData);
    return async dispatch => {
        const clientRes = await axios.post(`/api/vendors/${vendorId}/clients/${clientId}/jobs`, requestData);
        const vendorRes = await axios.get(`/api/vendors/${vendorId}`);
        //console.log("clientRes",clientRes);
        fetchVendor(vendorId);
        return dispatch({ type: CREATE_JOB, payload: clientRes });


    }
};

export const editJob = (id) => {

    return async dispatch => {
        let restructuredRes = {};
        const res = await axios.get(`/api/jobs/${id}`);
        Object.assign(restructuredRes, res.data, res.data.address);
        Object.assign(restructuredRes, {_id: res.data._id});
        //console.log("res",restructuredRes);

        return dispatch({ type: EDIT_JOB, payload: restructuredRes });
    }
};

export const updateJob = (values) => {
    return async dispatch => {
        const { houseNumber, street,city,state,zipcode, startDate, completed, type} = values;
        const newVals = {startDate, completed, type};
        newVals.address = {houseNumber, street,city,state,zipcode};
        console.log("values updating client ",newVals);
        const res = await axios.put(`/api/jobs/${values._id}`,newVals);

        return dispatch({ type: UPDATE_JOB, payload: res.data });
    }
};

export const deleteJob = (id) => {
    return async dispatch => {
        const res = await axios.delete(`/api/jobs/${id}`);
        //console.log("res",res);
        return dispatch({ type: DELETE_JOB, payload: res });
    }
};

export const fetchJob = (id) => {
    return async dispatch => {
        const res = await axios.get(`/api/jobs/${id}`);
        return dispatch({type: FETCH_JOB, payload: res});
    }
};

export const fetchJobs = () => {
    return async dispatch => {
        const res = await axios.get(`/api/jobs`);
        return dispatch({type: FETCH_JOBS, payload: res});
    }
};


/*
*
*    VENDORS
*
* */

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
        //console.log("res",res);
        return dispatch({ type: CREATE_VENDOR, payload: res });
    }
};

export const fetchVendors = () => {
    return async dispatch => {
        const res = await axios.get('/api/vendors');
        //console.log("res",res);
        return dispatch({ type: FETCH_VENDORS, payload: res });
    }
};


export const editVendor = (id) => {
    return async dispatch => {
        const res = await axios.get(`/api/vendors/edit/${id}`);
        //console.log("response",res);
        let {company,email,phone,address,website, _id} = res.data;
        let {houseNumber, street, city, state, zipcode} = address;
        const editValue = {_id, company,email,phone, houseNumber, street, city, state, zipcode, website};
        return dispatch({ type: EDIT_VENDOR, payload: editValue });
    }
};

export const fetchVendor = (id) => {
    return async dispatch => {
        const res = await axios.get(`/api/vendors/${id}`);
        return dispatch({type: FETCH_VENDOR, payload: res});
    }
};

export const updateVendor = (values) => {
    return async dispatch => {
        console.log("vendor values-->",values);
        const res = await axios.put(`/api/vendors/${values._id}`, values);
        console.log("res",res);
        return dispatch({ type: UPDATE_VENDOR, payload: res.data });
    }
};

export const deleteVendor = (id) => {
    return async dispatch => {
        const res = await axios.delete(`/api/vendors/${id}`);
        //console.log("res",res);
        return dispatch({ type: DELETE_VENDOR, payload: res });
    }
};









