import React, { Component } from 'react';

import DayView from './DayView/DayView';
import TaskView from './TaskView/TaskView';

class Workspace extends Component {
    state = {
        mode: 'DAY_VIEW'
    }
    modeChangeHandler = (mode) => {
        this.setState({
            mode,
        });
    }

    render() {
        const view = this.state.mode === 'DAY_VIEW' ? <DayView changeMode={this.modeChangeHandler} /> : <TaskView changeMode={this.modeChangeHandler} />;
        return view;
    }
}

export default Workspace;