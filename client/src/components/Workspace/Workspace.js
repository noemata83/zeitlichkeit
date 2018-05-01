import React, { Component } from 'react';
import { connect } from 'react-redux';

import DayView from './DayView/DayView';


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
        
        return(
            <div style={{padding:'2rem'}}>
                <h1>Day View</h1>
                <h3 onClick={() => this.modeChangeHandler('TASK_VIEW')}>Switch to Task View</h3>
                <DayView />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        tasks: state.workspace.tasks,
        sprints: state.workspace.sprints,
    }
}

export default connect(mapStateToProps)(Workspace);