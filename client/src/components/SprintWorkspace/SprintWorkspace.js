import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadSprints } from '../../store/actions/';
import { CircularProgress } from 'material-ui/Progress';
import { withStyles } from 'material-ui/styles';

import DayView from './DayView/DayView';
import TaskView from './TaskView/TaskView';

const styles = theme => ({
    progress: {
        margin: theme.spacing.unit * 2
    }
});

class SprintWorkspace extends Component {
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
        const { classes } = this.props;
        const view = this.state.mode === 'DAY_VIEW' ? <DayView changeMode={this.modeChangeHandler} /> : <TaskView changeMode={this.modeChangeHandler} />;
        return this.state.loading ? <CircularProgress color="secondary" className={classes.progress}/> : view;
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
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SprintWorkspace));