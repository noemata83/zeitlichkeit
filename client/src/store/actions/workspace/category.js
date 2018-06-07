import axios from 'axios';
import actionTypes from '../actionTypes';
import {
  setupRequest,
  handleServerError,
  handleResponse,
} from '../../helpers/utils';
import getRandomColor from '../../../services/randomColor';

export const addCategory = (category) => {
  const newCategory = { ...category };
  if (!newCategory.color) {
    newCategory.color = getRandomColor();
  }
  return (dispatch, getState) => {
    const { headers, workspace } = setupRequest(getState);
    return axios
      .post(`/api/workspaces/${workspace}/category/`, newCategory, { headers })
      .then(res => dispatch(handleResponse(res, actionTypes.ADD_CATEGORY, res.data)))
      .catch(err => dispatch(handleServerError(err)));
  };
};

export const deleteCategory = id =>
  (dispatch, getState) => {
    const { headers, workspace } = setupRequest(getState);
    return axios
      .delete(`/api/workspaces/${workspace}/category/${id}/`, { headers })
      .then(res => dispatch(handleResponse(res, actionTypes.DELETE_CATEGORY, id)))
      .catch(err => dispatch(handleServerError(err)));
  };

export const updateCategory = category =>
  (dispatch, getState) => {
    const { headers, workspace } = setupRequest(getState);
    return axios
      .put(`/api/workspaces/${workspace}/category/${category.id}/`, category, { headers })
      .then(res => dispatch(handleResponse(res, actionTypes.UPDATE_CATEGORY, res.data)))
      .catch(err => dispatch(handleServerError(err)));
  };

export const checkIfCategoryExists = category =>
  (_, getState) => {
    const categories = getState().workspace.category_set;
    return categories.map(cat => cat.name).includes(category);
  };
