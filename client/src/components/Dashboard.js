import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import classes from './Dashboard.css';
import { loadWorkspace, loadUser } from '../store/actions/';

import MODES from './displayModes';
import Header from './UI/Header/Header';
import SprintWorkspace from './SprintWorkspace/SprintWorkspace';
import ProjectManager from './ProjectManager/ProjectManager';
import Reports from './Reports/Reports';
import SideBar from './Sidebar/SideBar';

class Dashboard extends Component {

    state = {
        loading: true,
        user: null,
        mode: MODES.SPRINT,
        mobileOpen: false,
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.user && prevState.loading) {
            nextProps.loadWorkspace();
        }
        return {...prevState, user: nextProps.user}
    }

    componentDidMount() {
        if (this.state.loading) {
            this.props.loadUser();
            this.setState({
                loading: false
            });
        }
    }

    setMode = (mode) => {
        this.setState({
            mode,
            mobileOpen: false
        });
    }

    handleDrawerToggle = () => {
        this.setState({ mobileOpen: !this.state.mobileOpen});
    }

    renderWorkspace = (mode) => {
        switch(mode) {
            case MODES.SPRINT:
                return <SprintWorkspace />;
            case MODES.PROJECT:
                return <ProjectManager />;
            case MODES.REPORT:
                return <Reports />;
            default:
                return <SprintWorkspace />;
        }
    }

    render() {
        const { user, loading, mode } = this.state;
        return (!user && !loading) ? <Redirect to="/" /> : (
            <div className={classes.Dashboard}>
                <Header handleDrawerToggle={this.handleDrawerToggle} />
                <main className={classes.Main}>
                    <SideBar setMode={this.setMode} mobileOpen={this.state.mobileOpen} handleDrawerToggle={this.handleDrawerToggle} />
                    <div className={classes.Workspace}>
                        {this.renderWorkspace(mode)}
                    </div>
                </main>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadWorkspace: () => dispatch(loadWorkspace()),
        loadUser: () => dispatch(loadUser())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);