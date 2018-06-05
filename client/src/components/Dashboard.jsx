import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import classes from './Dashboard.css';
import { loadWorkspace, loadUser } from '../store/actions/';

import MODES from './displayModes';
import Header from './UI/Header/Header';
import SprintWorkspace from './SprintWorkspace/SprintWorkspace';
import ProjectManager from './ProjectManager/ProjectManager';
import Reports from './Reports/Reports';
import SideBar from './Sidebar/SideBar';
import SwitchWorkspaceDialog from './UI/Dialogs/switchWorkspace';
import CategoryManager from './CategoryManager/CategoryManager';

class Dashboard extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.user && prevState.loading && !prevState.user) {
      const workspace = nextProps.user.account.default_workspace.id;
      nextProps.loadWorkspace(workspace);
    }
    return { ...prevState, user: nextProps.user };
  }

  state = {
    loading: true,
    user: null,
    mode: MODES.SPRINT,
    mobileOpen: false,
    anchorEl: null,
    dialogOpen: false,
  };

  componentDidMount() {
    if (this.state.loading) {
      this.props.loadUser();
      // TODO: This is probably an anti-pattern. Refactor.
      // eslint-disable-next-line
      this.setState({
        loading: false,
      });
    }
  }

  setMode = (mode) => {
    this.setState({
      mode,
      mobileOpen: false,
    });
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  handleMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  handleDialogOpen = () => {
    this.setState({
      anchorEl: null,
      dialogOpen: true,
    });
  };

  handleDialogClose = () => {
    this.setState({ dialogOpen: false });
  };

  handleSwitchWorkspace = (id) => {
    this.setState({ dialogOpen: false });
    this.props.loadWorkspace(id);
  };

  renderWorkspace = (mode) => {
    switch (mode) {
      case MODES.SPRINT:
        return <SprintWorkspace />;
      case MODES.PROJECT:
        return <ProjectManager />;
      case MODES.REPORT:
        return <Reports />;
      case MODES.TEAM:
        return (
          <div style={{ fontSize: '3rem', padding: '2rem' }}>
            Meet Your Team... Later!
          </div>
        );
      case MODES.CATEGORIES:
        return <CategoryManager />;
      default:
        return <SprintWorkspace />;
    }
  };

  render() {
    const { user, loading, mode } = this.state;
    return !user && !loading ? (
      <Redirect to="/" />
    ) : (
      <div className={classes.Dashboard}>
        <Header
          handleDrawerToggle={this.handleDrawerToggle}
          handleMenu={this.handleMenu}
          handleClose={this.handleMenuClose}
          anchorEl={this.state.anchorEl}
          handleDialogOpen={this.handleDialogOpen}
        />
        <main className={classes.Main}>
          <SideBar
            setMode={this.setMode}
            mobileOpen={this.state.mobileOpen}
            handleDrawerToggle={this.handleDrawerToggle}
          />
          <div className={classes.Workspace}>{this.renderWorkspace(mode)}</div>
        </main>
        <SwitchWorkspaceDialog
          open={this.state.dialogOpen}
          handleClose={this.handleDialogClose}
          handleSwitchWorkspace={this.handleSwitchWorkspace}
        />
      </div>
    );
  }
}

Dashboard.propTypes = {
  loadUser: PropTypes.func.isRequired,
  loadWorkspace: PropTypes.func.isRequired,
};

const mapStateToProps = state =>
  ({
    user: state.auth.user,
  });

const mapDispatchToProps = dispatch =>
  ({
    loadWorkspace: workspace => dispatch(loadWorkspace(workspace)),
    loadUser: () => dispatch(loadUser()),
  });

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
