import actionTypes from './actionTypes';
import axios from 'axios';
import jstz from 'jstz';

const setHeaders = (getState) => {
    const token = getState().auth.token;

    let headers = {
        "Content-type": "application/json",
    }

    if (token) {
        headers["Authorization"]= `Token ${token}`;
    }

    return headers;
}

const handleServerError = (res) => {
    if (res.status < 500) {
        return {status: res.status, data: res.data};
    } else {
        throw res;
    }
}

const handleResponse = (res, action) => {
    console.log("handle response got called.");
    return (dispatch) => {
        console.log("in the returned function.");
        console.log(res.status);
        if (res.status >= 200 && res.status <= 204) {
            console.log("At the point when the dispatch should happen.");
            return dispatch({type: action, data: res.data});
        } else if (res.status >= 400 && res.status < 500) {
            return dispatch({type: actionTypes.AUTHENTICATION_ERROR, data: res.data});
        }
    }
}

export const loadWorkspace = () => {
    return (dispatch, getState) => {
        dispatch({type: actionTypes.WORKSPACE_LOADING});

        const token = getState().auth.token;

        let headers = {
            "Content-Type": "application/json",
        };

        if (token) {
            headers["Authorization"]= `Token ${token}`;
        }

        const workspace = getState().auth.user.account.default_workspace.id;

        return axios.get(`/api/workspaces/${workspace}/`, {headers, })
            .then(res => {
                if (res.status < 500) {
                    return {status: res.status, data: res.data};
                } else {
                    throw res;
                }
            })
            .then(res => {
                if (res.status === 200) {
                    dispatch({type: actionTypes.WORKSPACE_LOADED, workspace: res.data});
                    return res.data;
                } else if (res.status >= 400 && res.status < 500) {
                    dispatch({type: actionTypes.AUTHENTICATION_ERROR, data: res.data})
                    throw res.data;
                }
            }); 
    }
}

export const loadSprints = () => {
    return (dispatch, getState) => {
        dispatch({type: actionTypes.SPRINT_LOADING});

        if (!localStorage.getItem('timezone')) {
            const tz = jstz.determine() || 'UTC';
            localStorage.setItem('timezone', tz.name());
        }

        const token = getState().auth.token;

        let headers = {
            "Content-Type": "application/json",
        };

        if (token) {
            headers["Authorization"]= `Token ${token}`;
        }

        const workspace = getState().workspace.id;

        return axios.get(`/api/workspaces/${workspace}/sprints/`, {headers, })
            .then(res => {
                if (res.status < 500) {
                    return {status: res.status, data: res.data};
                } else {
                    console.log("Server error.");
                    throw res;
                }
            })
            .then(res => {
                if (res.status === 200) {
                    dispatch({type: actionTypes.SPRINT_LOADED, data: res.data});
                    return res.data;
                } else if (res.status >= 400 && res.status < 500) {
                    dispatch({type: actionTypes.AUTHENTICATION_ERROR, data: res.data})
                    throw res.data;
                }
            }); 
    }
}

export const addSprint = (sprint_data) => {
    return (dispatch, getState) => {
        const token = getState().auth.token;

        let headers = {
            "Content-Type": "application/json",
        };

        if (token) {
            headers["Authorization"]= `Token ${token}`;
        }
        const workspace = getState().workspace.id;

        return axios.post(`/api/workspaces/${workspace}/sprints/`, sprint_data, {headers, })
            .then(res => {
                if (res.status < 500) {
                    return {status: res.status, data: res.data};
                } else {
                    throw res;
                }
            })
            .then(res => {
                if (res.status >= 400 && res.status < 500) {
                    dispatch({type: actionTypes.AUTHENTICATION_ERROR, data: res.data});
                    throw res.data;
                }
                dispatch({type: actionTypes.ADD_SPRINT, sprint: res.data});
                return res.data;
            }); 
    }
}

export const addTaskandSprint = (task_data, sprint_data) => {
    return (dispatch, getState) => {
        const token = getState().auth.token;

        let headers = {
            "Content-Type": "application/json",
        };

        if (token) {
            headers["Authorization"]= `Token ${token}`;
        }
        const workspace = getState().workspace.id;

        return axios.post(`/api/workspaces/${workspace}/tasks/`, task_data, {headers, })
            .then(res => {
                if (res.status < 500) {
                    return {status: res.status, data: res.data};
                } else {
                    throw res;
                }
            })
            .then(res => {
                if (res.status === 201) {
                    dispatch({type: actionTypes.ADD_TASK, task: res.data});
                    dispatch(addSprint(sprint_data));
                } else if (res.status >= 400 && res.status < 500) {
                    dispatch({type: actionTypes.AUTHENTICATION_ERROR, data: res.data})
                    throw res.data;
                }
            }); 
    }
}

export const deleteSprint = (sprint_id) => {
    return (dispatch, getState) => {
        const token = getState().auth.token;

        let headers = {
            "Content-Type": "application/json",
        };

        if (token) {
            headers["Authorization"]= `Token ${token}`;
        }
        const workspace = getState().workspace.id;
        return axios.delete(`/api/workspaces/${workspace}/sprints/${sprint_id}/`, {headers, }).then(res => {
                if (res.status < 500) {
                    return {status: res.status, data: res.data};
                } else {
                    throw res;
                }
            })
            .then(res => {
                if (res.status === 204) {
                    return dispatch({type: actionTypes.DELETE_SPRINT, sprint_id});
                }  else if (res.status >= 400 && res.status < 500) {
                    dispatch({type: actionTypes.AUTHENTICATION_ERROR, data: res.data})
                    throw res.data;
                }
            });
    }
}

export const addProject = (project) => {
    return (dispatch, getState) => {
        const headers = setHeaders(getState);

        const workspace = getState().workspace.id;
        const request = {
            name: project
        };
        return axios.post(`/api/workspaces/${workspace}/projects/`, request, {headers,})
            .then(res => handleServerError(res))
            .then(res => dispatch(handleResponse(res, actionTypes.ADD_PROJECT)));
    }
}

