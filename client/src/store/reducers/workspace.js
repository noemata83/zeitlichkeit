import actionTypes from '../actions/actionTypes';

const initialState = {
    workspace: {
        id: null,
        name: '',
        users: []
    },
    projects: [],
    tasks: [],
    sprints: []
}

export default (state=initialState, action) => {
    
    return state;
}