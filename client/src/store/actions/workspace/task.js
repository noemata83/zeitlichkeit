import actionTypes from '../actionTypes';
import axios from 'axios';
import { setupRequest, handleServerError, handleResponse } from '../../helpers/utils';

export const addTask = (task) => {
    return (dispatch, getState) => {
        const {headers, workspace } = setupRequest(getState);
        return axios.post(`/api/workspaces/${workspace}/tasks/`, task, {headers,})
            .then(res => handleServerError(res))
            .then(res => dispatch(handleResponse(res, actionTypes.ADD_TASK, res.data)));
    }
}

export const deleteTask = taskId => {
    return (dispatch, getState) => {
        const { headers, workspace } = setupRequest(getState);
        return axios.delete(`/api/workspaces/${workspace}/tasks/${taskId}/`, {headers, })
            .then(res => handleServerError(res))
            .then(res => dispatch(handleResponse(res, actionTypes.DELETE_TASK, taskId)));
    }
}
