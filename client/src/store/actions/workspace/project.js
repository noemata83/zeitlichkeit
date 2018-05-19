import actionTypes from '../actionTypes';
import axios from 'axios';
import { setupRequest, handleServerError, handleResponse } from '../../helpers/utils';

export const loadProjects = () => {
    return (dispatch, getState) => {
        dispatch({type: actionTypes.PROJECTS_LOADING});
        const { headers, workspace } = setupRequest(getState);
        return axios.get(`/api/workspaces/${workspace}/projects/`, {headers, })
            .then(res => handleServerError(res))
            .then(res => dispatch(handleResponse(res, actionTypes.PROJECTS_LOADED, res.data.results)));
    }
}

export const addProject = (project) => {
    return (dispatch, getState) => {
        const { headers, workspace } = setupRequest(getState);
        const request = {
            name: project
        };
        return axios.post(`/api/workspaces/${workspace}/projects/`, request, {headers,})
            .then(res => handleServerError(res))
            .then(res => dispatch(handleResponse(res, actionTypes.ADD_PROJECT, res.data)));
    }
}

export const deleteProject = (id, name) => {
    return (dispatch, getState) => {
        const { headers, workspace } = setupRequest(getState);
        return axios.delete(`/api/workspaces/${workspace}/projects/${id}/`, {headers, })
            .then(res => handleServerError(res))
            .then (res => dispatch(handleResponse(res, actionTypes.DELETE_PROJECT, {id, name})));
    }
}