import axios from 'axios';
import actionTypes from '../actionTypes';
import {
  setupRequest,
  handleServerError,
  handleResponse,
} from '../../helpers/utils';

const extractTaskRecord = data => ({
  name: data.name,
  id: data.id,
  project: data.project.name,
  categories: data.categories,
  completed: data.completed,
});

export const addTask = task =>
  (dispatch, getState) => {
    const { headers, workspace } = setupRequest(getState);
    return axios
      .post(`/api/workspaces/${workspace}/tasks/`, task, { headers })
      .then(res => dispatch(handleResponse(res, actionTypes.ADD_TASK, extractTaskRecord(res.data))))
      .catch(err => dispatch(handleServerError(err)));
  };

export const deleteTask = taskId =>
  (dispatch, getState) => {
    const { headers, workspace } = setupRequest(getState);
    return axios
      .delete(`/api/workspaces/${workspace}/tasks/${taskId}/`, { headers })
      .then(res => dispatch(handleResponse(res, actionTypes.DELETE_TASK, taskId)))
      .catch(err => dispatch(handleServerError(err)));
  };

export const updateTask = (id, task) =>
  (dispatch, getState) => {
    const { headers, workspace } = setupRequest(getState);
    return axios
      .put(`/api/workspaces/${workspace}/tasks/${id}/`, task, { headers })
      .then(res => dispatch(handleResponse(
        res,
        actionTypes.UPDATE_TASK,
        extractTaskRecord(res.data),
      )))
      .catch(err => dispatch(handleServerError(err)));
  };
