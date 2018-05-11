import actionTypes from '../actions/actionTypes';
import moment from '../../services/moment';

const initialState = {
    id: null,
    name: '',
    users: [],
    project_set: [],
    task_set: [],
    sprints: [],
    error: null,
    loading: true,
    sprint_loading: true
}

export default (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.WORKSPACE_LOADING: {
            return {...state, loading: true}
        }
        case actionTypes.WORKSPACE_LOADED: {
            return {...state, ...action.workspace, loading: false, error: null}
        }
        case actionTypes.SPRINT_LOADING: {
            return {...state, sprint_loading: true}
        }
        case actionTypes.SPRINT_LOADED: {
            const { count, results } = action.data;
            /* Here we need to localize the times we take in from the backend, which stores its times
             * in UTC. */
            const currTz = localStorage.getItem('timezone');
            const sprints = results.map(sprint => {
                const sprint_start = moment(sprint.start_time);
                const sprint_end = moment(sprint.end_time);
                const start_time = sprint_start.tz(currTz).toISOString();
                const end_time = sprint_end.tz(currTz).toISOString();
                return {
                    ...sprint,
                    start_time,
                    end_time
                }
            })
            return { ...state, sprint_count: count, sprints, sprint_loading: false}
        }
        case actionTypes.ADD_TASK: {
            const task = action.task;
            const task_set = [...state.task_set, task];
            return { ...state, task_set};
        }
        default:
            return state;
    }
}