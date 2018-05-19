import actionTypes from '../actionTypes';
import axios from 'axios';
import { setupRequest, handleServerError, handleResponse, setTimeZone } from '../../helpers/utils';

export const loadSprints = () => {
    return (dispatch, getState) => {
        dispatch({type: actionTypes.SPRINT_LOADING});
        setTimeZone();
        const { headers, workspace } = setupRequest(getState);
        return axios.get(`/api/workspaces/${workspace}/sprints/`, {headers, })
            .then(res => handleServerError(res))
            .then(res => dispatch(handleResponse(res, actionTypes.SPRINT_LOADED, res.data))); 
    }
}

export const addSprint = (sprint_data) => {
    return (dispatch, getState) => {
        const { headers, workspace } = setupRequest(getState);
        return axios.post(`/api/workspaces/${workspace}/sprints/`, sprint_data, {headers, })
            .then(res => handleServerError(res))
            .then(res => dispatch(handleResponse(res, actionTypes.ADD_SPRINT, res.data))); 
    }
}

export const deleteSprint = (sprint_id) => {
    return (dispatch, getState) => {
        const { headers, workspace } = setupRequest(getState);
        return axios.delete(`/api/workspaces/${workspace}/sprints/${sprint_id}/`, {headers, })
            .then(res => handleServerError(res))               
            .then(res => dispatch(handleResponse(res, actionTypes.DELETE_SPRINT, sprint_id)));
    }       
}

export const addTaskandSprint = (task_data, sprint_data) => {
    return (dispatch, getState) => {
        const { headers, workspace } = setupRequest(getState);
        return axios.post(`/api/workspaces/${workspace}/tasks/`, task_data, {headers, })
            .then(res => handleServerError(res))
            .then(res => {
                if (res.status === 201) {
                    dispatch({type: actionTypes.ADD_TASK, data: res.data});
                    dispatch(addSprint(sprint_data));
                } else if (res.status >= 400 && res.status < 500) {
                    dispatch({type: actionTypes.AUTHENTICATION_ERROR, data: res.data})
                    throw res.data;
                }
            }); 
    }
}
