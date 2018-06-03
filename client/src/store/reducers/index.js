import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth';
import workspace from './workspace';

export default combineReducers({
  form: formReducer,
  auth,
  workspace,
});
