import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth, * as fromAuth from './auth';
import workspace, * as fromWorkspace from './workspace';

export default combineReducers({
  form: formReducer,
  auth,
  workspace,
});

export const getWorkspaceName = state => fromWorkspace.getWorkspaceName(state.workspace);
export const getProjects = state => fromWorkspace.getProjects(state.workspace);

export const getSprints = state => fromWorkspace.getSprints(state.workspace);
export const getTodaysSprints = state => fromWorkspace.getTodaysSprints(state.workspace);

export const getTasks = state => fromWorkspace.getTasks(state.workspace);
export const getActiveTasks = state => fromWorkspace.getActiveTasks(state.workspace);

export const getCategories = state => fromWorkspace.getCategories(state.workspace);

export const getClients = state => fromWorkspace.getClients(state.workspace);

export const getUsers = state => fromWorkspace.getUsers(state.workspace);

export const getCurrentUser = state => fromAuth.getCurrentUser(state.auth);

export const getCurrentUsername = state => fromAuth.getCurrentUsername(state.auth);
