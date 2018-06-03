/*  This module collects the action creators associated with reading, updating, and destroying  *
 *  workspace records.                                                                        */
import axios from 'axios';
import actionTypes from './actionTypes';
import { handleServerError, handleResponse, setHeaders } from '../helpers/utils';
import { loadSprints } from './workspace/sprint';

export const loadWorkspace = workspace =>
  (dispatch, getState) => {
    dispatch({ type: actionTypes.WORKSPACE_LOADING });
    const headers = setHeaders(getState);

    return axios
      .get(`/api/workspaces/${workspace}/`, { headers })
      .then((res) => {
        dispatch(handleResponse(res, actionTypes.WORKSPACE_LOADED, res.data));
        dispatch(loadSprints());
      })
      .catch(err => dispatch(handleServerError(err)));
  };

export default loadWorkspace;
