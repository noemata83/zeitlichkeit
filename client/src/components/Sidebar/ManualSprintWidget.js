import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';

function toDatetimeLocal(date) {
    const ten = i => (i < 10 ? '0' : '' ) + i,
    YYYY = date.getFullYear(),
    MM = ten(date.getMonth() + 1),
    DD = ten(date.getDate()),
    HH = ten(date.getHours()),
    II = ten(date.getMinutes()),
    SS = ten(date.getSeconds());
    return `${YYYY}-${MM}-${DD}T${HH}:${II}:${SS}`;
}

class ManualSprintWidget extends Component {
    state = {
        start_time: new Date(),
        end_time: new Date(),
        task: ''
    }

    changeInputHandler = (event, input) => {
        this.setState({
            [input]: event.target.value
        })
    }
    changeStartHandler = (event) => {
        this.setState({
            start_time: new Date(event.target.value)
        });
    }
    changeEndHandler = (event) => {
        this.setState({
            end_time: new Date(event.target.value)
        });
    }

    render() {
        return(
            <div>
                <TextField label="Task" name="task" type="text" fullWidth onChange={(event) => this.changeInputHandler(event, 'task')} value={this.state.task} />
                <TextField name="start_time" label="Start Time:" type="datetime-local" fullWidth onChange={this.changeStartHandler} value={toDatetimeLocal(this.state.start_time)}/>
                <TextField name="end_time" label="End Time:" type="datetime-local" fullWidth onChange={this.changeEndHandler} value={toDatetimeLocal(this.state.end_time)}/>
                <button onClick={() => console.log(`${this.state.task}: \n${this.state.start_time.toISOString()}\n${this.state.end_time.toISOString()}`)}>Submit</button>
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