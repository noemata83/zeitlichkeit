import actionTypes from '../actionTypes';
import axios from 'axios';
import { setupRequest, handleServerError, handleResponse } from '../../helpers/utils';

export const addTask = (task) => {
    return (dispatch, getState) => {
        const {headers, workspace } = setupRequest(getState);
        return axios.post(`/api/workspaces/${workspace}/tasks/`, task, {headers,})
            .then(res => handleServerError(res))
            .then(res => dispatch(handleResponse(res, actionTypes.ADD_TASK, {
                /* Here we have to cope with the fact that the data retrieved from this request
                   is not of the same form as the data retrieved via the initial call to the workspace
                   endpoint. Here, we convert the data into the desired form to normalize the store data. */
                name: res.data.name,
                id: res.data.id,
                project: res.data.project.name,
                categories: res.data.categories,
                completed: res.data.completed}
            )));
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
