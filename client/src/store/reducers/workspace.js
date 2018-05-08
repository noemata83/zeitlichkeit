import actionTypes from '../actions/actionTypes';

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
            console.log("Loading workspace.");
            return {...state, loading: true}
        }
        case actionTypes.WORKSPACE_LOADED: {
            console.log("Workspace loaded.");
            return {...state, ...action.workspace, loading: false, error: null}
        }
        case actionTypes.SPRINT_LOADING: {
            console.log("Loading Sprints.");
            return {...state, sprint_loading: true}
        }
        case actionTypes.SPRINT_LOADED: {
            const { count, results } = action.data;
            return { ...state, sprint_count: count, sprints: results, sprint_loading: false}
        }
        default:
            return state;
    }
}