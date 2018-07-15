import axios from 'axios';
import actionTypes from '../actionTypes';
import {
  setupRequest,
  handleServerError,
  handleResponse,
} from '../../helpers/utils';
import getRandomColor from '../../../services/randomColor';

export const addClient = (client) => {
  const newClient = { ...client };
  if (!newClient.color) {
    newClient.color = getRandomColor();
  }
  return (dispatch, getState) => {
    const { headers, workspace } = setupRequest(getState);
    return axios
      .post(`/api/workspaces/${workspace}/clients/`, client, { headers })
      .then(res =>
        dispatch(handleResponse(res, actionTypes.ADD_CLIENT, res.data)))
      .catch(err => dispatch(handleServerError(err)));
  };
};

export const deleteClient = id => (dispatch, getState) => {
  const { headers, workspace } = setupRequest(getState);
  return axios.delete(`/api/workspaces/${workspace}/clients/${id}/`, { headers })
    .then(res => dispatch(handleResponse(res, actionTypes.DELETE_CLIENT, id)))
    .catch(err => dispatch(handleServerError(err)));
};

export const updateClient = client =>
  (dispatch, getState) => {
    const { headers, workspace } = setupRequest(getState);
    return axios
      .put(`/api/workspaces/${workspace}/clients/${client.id}/`, client, { headers })
      .then(res => dispatch(handleResponse(res, actionTypes.UPDATE_CLIENT, res.data)))
      .catch(err => dispatch(handleServerError(err)));
  };

export const checkIfClientExists = client =>
  (_, getState) => {
    const clients = getState().workspace.client_set;
    return clients.map(cat => cat.name).includes(client);
  };
