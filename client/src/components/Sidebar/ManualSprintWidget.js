import React, { Component } from 'react';
import Datetime from 'react-datetime';
import { connect } from 'react-redux';

class ManualSprintWidget extends Component {
    state = {
        start_time: new Date(),
        end_time: new Date()
    }

    changeStartHandler = (moment) => {
        this.setState({
            start_time: moment.toDate()
        });
    }
    changeEndHandler = (moment) => {
        this.setState({
            end_time: moment.toDate()
        });
    }

    render() {
        return(
            <div>
                Start Time: <Datetime dateFormat="YYYY-MM-DD" timeFormat="HH:mm" onChange={this.changeStartHandler} value={this.state.start_time}/>
                End Time: <Datetime dateFormat="YYYY-MM-DD" timeFormat="HH:mm" onChange={this.changeEndHandler} value={this.state.end_time}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        projects: state.workspace.projects,
        tasks: state.workspace.task_set
    }
}

export default connect(mapStateToProps)(ManualSprintWidget);