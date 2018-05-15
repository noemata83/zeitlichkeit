import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import classes from './Dashboard.css';
import { loadWorkspace, loadUser } from '../store/actions/';


import Header from './UI/Header/Header';
import Workspace from './Workspace/Workspace';
import SideBar from './Sidebar/SideBar';

class Dashboard extends Component {

    state = {
        loading: true,
        user: null,
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

    render() {
        const { user, loading } = this.state;
        return (!user && !loading) ? <Redirect to="/" /> : (
            <div className={classes.Dashboard}>
                <Header />
                <main className={classes.Main}>
                    <SideBar />
                    <div className={classes.Workspace}>
                        <Workspace />
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