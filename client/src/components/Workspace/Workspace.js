import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadSprints } from '../../store/actions/';

import DayView from './DayView/DayView';
import TaskView from './TaskView/TaskView';

class Workspace extends Component {
    state = {
        mode: 'DAY_VIEW',
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.workspace_loaded && nextProps.loading) {
            nextProps.loadSprints();
        }
        return { ...prevState, loading: nextProps.loading}
    }

    modeChangeHandler = (mode) => {
        this.setState({
            mode,
        });
    }

    render() {
        const view = this.state.mode === 'DAY_VIEW' ? <DayView changeMode={this.modeChangeHandler} /> : <TaskView changeMode={this.modeChangeHandler} />;
        return this.state.loading ? <div>Loading...</div> : view;
    }
}

const mapStateToProps = state => {
    return {
        workspace_loaded: !state.workspace.loading,
        loading: state.workspace.sprint_loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadSprints: () => dispatch(loadSprints()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Workspace);