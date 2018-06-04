import actionTypes from '../actions/actionTypes';
import moment from '../../services/moment';

const initialState = {
  id: null,
  name: '',
  users: [],
  project_set: [],
  task_set: [],
  sprints: [],
  projects: [],
  tasks: [],
  error: null,
  loading: true,
  sprint_loading: true,
  task_loading: true,
  project_loading: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.WORKSPACE_LOADING: {
      return { ...state, loading: true };
    }
    case actionTypes.WORKSPACE_LOADED: {
      return {
        ...state,
        ...action.data,
        loading: false,
        error: null,
      };
    }
    case actionTypes.SPRINT_LOADING: {
      return { ...state, sprint_loading: true };
    }
    case actionTypes.SPRINT_LOADED: {
      const { count, results } = action.data;
      /* Here we need to localize the times we take in from the backend, which stores its times
             * in UTC. */
      const currTz = localStorage.getItem('timezone');
      const sprints = results.map((sprint) => {
        const sprint_start = moment(sprint.start_time);
        const sprint_end = moment(sprint.end_time);
        const start_time = sprint_start.tz(currTz).toISOString();
        const end_time = sprint_end.tz(currTz).toISOString();
        return {
          ...sprint,
          start_time,
          end_time,
        };
      });
      return {
        ...state,
        sprint_count: count,
        sprints,
        sprint_loading: false,
      };
    }
    case actionTypes.ADD_TASK: {
      const task = action.data;
      const task_set = [...state.task_set, task];
      return { ...state, task_set };
    }
    case actionTypes.DELETE_TASK: {
      /*  ACTION INCOMPLETE:
                This action should take care of removing associated sprints. These sprints
                are automatically deleted by the backend server. Run a filter on sprints
                to remove those associated with the task to be deleted. */
      const taskId = action.data;
      const task_set = state.task_set.filter(task => task.id !== taskId);
      return { ...state, task_set };
    }
    case actionTypes.UPDATE_TASK: {
      const task = action.data;
      const task_set = state.task_set.map((oldTask) => {
        if (oldTask.id === task.id) {
          return task;
        }
        return oldTask;
      });
      return { ...state, task_set };
    }
    case actionTypes.ADD_SPRINT: {
      const sprint = action.data;
      const sprints = [...state.sprints, sprint];
      return { ...state, sprints };
    }
    case actionTypes.DELETE_SPRINT: {
      const id = action.data;
      const sprints = state.sprints.filter(sprint => sprint.id !== id);
      return { ...state, sprints };
    }
    case actionTypes.ADD_PROJECT: {
      const project = action.data;
      const project_set = [...state.project_set, project];
      return { ...state, project_set };
    }
    case actionTypes.DELETE_PROJECT: {
      /*  ACTION INCOMPLETE:
                This action should also take care of cleaning up after deleting a project,
                removing all associated task and sprint data for the task (and sprints)
                which fall under it. This is heavy-lifting, though. */
      const { id } = action.data;
      const project_set = state.project_set.filter(project => project.id !== id);
      return { ...state, project_set };
    }
    case actionTypes.PROJECTS_LOADING: {
      return { ...state, project_loading: true };
    }
    case actionTypes.PROJECTS_LOADED: {
      const projects = action.data;
      return { ...state, project_loading: false, projects };
    }
    case actionTypes.ADD_CATEGORY: {
      const category = action.data;
      const category_set = [...state.category_set, category];
      return { ...state, category_set };
    }
    case actionTypes.DELETE_CATEGORY: {
      const id = action.data;
      const category_set = state.category_set.filter(cat => cat.id !== id);
      return { ...state, category_set };
    }
    case actionTypes.SERVER_ERROR: {
      const error = action.data;
      return { ...state, error };
    }
    default:
      return state;
  }
};
