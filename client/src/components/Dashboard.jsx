import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import classes from './Dashboard.css';
import {
  loadWorkspace,
  loadUser,
  joinWorkspace,
  addCategory,
  updateCategory,
  deleteCategory,
  checkIfCategoryExists,
  addClient,
  updateClient,
  deleteClient,
  checkIfClientExists,
} from '../store/actions/';

import Header from './UI/Header/Header';
import SprintWorkspace from './SprintWorkspace/SprintWorkspace';
import Dash from './Dash/dash';
import ProjectManager from './ProjectManager/ProjectManager';
import Reports from './Reports/Reports';
import Team from './Team/Team';
import SideBar from './Sidebar/SideBar';
import SwitchWorkspaceDialog from './UI/Dialogs/switchWorkspace';
import ManagerDialog from './UI/Dialogs/ManagerDialog';
import JoinWorkSpaceDialog from './UI/Dialogs/joinWorkspace';
import {
  getProjects,
  getClients,
  getCategories,
  getSprints,
  getCurrentUser,
} from '../store/reducers/';


class Dashboard extends Component {
  state = {
    loading: true,
    workspace_loaded: false,
    user: null,
    mode: null,
    mobileOpen: false,
    anchorEl: null,
    inviteCode: '',
    swDialogOpen: false,
    jwDialogOpen: false,
    catDialogOpen: false,
    gsDialogOpen: false,
    cliDialogOpen: false,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.user && prevState.loading && !prevState.user) {
      const workspace = nextProps.user.account.default_workspace.id;
      nextProps.loadWorkspace(workspace);
    }
    if (prevState.workspace_loaded && nextProps.projects.length === 0) {
      return { ...prevState, user: nextProps.user, gsDialogOpen: true };
    }
    if (!nextProps.loading) {
      return { ...prevState, user: nextProps.user, workspace_loaded: true };
    }
    return { ...prevState, user: nextProps.user };
  }
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

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  handleMenu = event =>
    this.setState({ anchorEl: event.currentTarget });

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  handleSWDialogOpen = () => {
    this.setState({
      anchorEl: null,
      swDialogOpen: true,
    });
  };

  handleSWDialogClose = () => {
    this.setState({ swDialogOpen: false });
  };

  handleJWDialogOpen = () =>
    this.setState({ jwDialogOpen: true, anchorEl: null });
  handleJWDialogClose = () => this.setState({ jwDialogOpen: false });

  handleInviteCodeInput = event =>
    this.setState({ inviteCode: event.target.value });

  handleGSDialogClose = () => {
    this.setState({ gsDialogOpen: false });
  };

  handleSwitchWorkspace = (id) => {
    this.setState({ swDialogOpen: false });
    this.props.loadWorkspace(id);
  };

  handleJoinWorkspace = () => {
    this.setState({ jwDialogOpen: false });
    this.props.joinWorkspace(this.state.inviteCode);
  };

  handleCatDialogOpen = () => this.setState({ catDialogOpen: true });

  handleCatDialogClose = () => this.setState({ catDialogOpen: false });

  handleCliDialogOpen = () => this.setState({ cliDialogOpen: true });

  handleCliDialogClose = () => this.setState({ cliDialogOpen: false });

  render() {
    const { user, loading } = this.state;
    const { match } = this.props;
    return !user && !loading ? (
      <Redirect to="/" />
    ) : (
      <div className={classes.Dashboard}>
        <Header
          handleDrawerToggle={this.handleDrawerToggle}
          handleMenu={this.handleMenu}
          handleClose={this.handleMenuClose}
          anchorEl={this.state.anchorEl}
          handleSWDialogOpen={this.handleSWDialogOpen}
          handleJWDialogOpen={this.handleJWDialogOpen}
        />
        <main className={classes.Main}>
          <SideBar
            setMode={this.setMode}
            mobileOpen={this.state.mobileOpen}
            handleDrawerToggle={this.handleDrawerToggle}
            handleCatDialogOpen={this.handleCatDialogOpen}
            handleCliDialogOpen={this.handleCliDialogOpen}
          />
          {/* <div className={classes.Workspace}>{this.renderWorkspace(mode)}</div> */}
          <div className={classes.Workspace}>
            <Route exact path={`${match.url}/`} component={() => (this.props.user ? <Dash /> : <CircularProgress />)} />
            <Route path={`${match.url}/ledger`} component={() => (this.props.user ? <SprintWorkspace isData={this.props.sprintDataExists} /> : <CircularProgress />)} />
            <Route path={`${match.url}/project`} component={ProjectManager} />
            <Route path={`${match.url}/reports`} component={Reports} />
            <Route path={`${match.url}/team`} component={Team} />
          </div>
        </main>
        <SwitchWorkspaceDialog
          open={this.state.swDialogOpen}
          handleClose={this.handleSWDialogClose}
          handleSwitchWorkspace={this.handleSwitchWorkspace}
        />
        <JoinWorkSpaceDialog
          open={this.state.jwDialogOpen}
          handleClose={this.handleJWDialogClose}
          handleInviteCodeInput={this.handleInviteCodeInput}
          handleJoinWorkspace={this.handleJoinWorkspace}
          inviteCode={this.state.inviteCode}
        />
        <ManagerDialog
          open={this.state.catDialogOpen}
          handleClose={this.handleCatDialogClose}
          dialogTitle="Manage Workspace Categories"
          inputName="newCategory"
          inputLabel="Add New Category"
          items={this.props.categories}
          add={this.props.addCategory}
          update={this.props.updateCategory}
          deleteItem={this.props.deleteCategory}
          checkForDuplicate={this.props.checkIfCategoryExists}
        />
        <ManagerDialog
          open={this.state.cliDialogOpen}
          handleClose={this.handleCliDialogClose}
          dialogTitle="Manage Clients"
          inputName="newClient"
          inputLabel="Enter new client name"
          items={this.props.clients}
          add={this.props.addClient}
          update={this.props.updateClient}
          deleteItem={this.props.deleteClient}
          checkForDuplicate={this.props.checkIfClientExists}
        />
      </div>
    );
  }
}

Dashboard.defaultProps = {
  user: null,
};

Dashboard.propTypes = {
  loadUser: PropTypes.func.isRequired,
  loadWorkspace: PropTypes.func.isRequired,
  user: PropTypes.object,
  joinWorkspace: PropTypes.func.isRequired,
  sprintDataExists: PropTypes.bool.isRequired,
  clients: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  addCategory: PropTypes.func.isRequired,
  updateCategory: PropTypes.func.isRequired,
  deleteCategory: PropTypes.func.isRequired,
  checkIfCategoryExists: PropTypes.func.isRequired,
  addClient: PropTypes.func.isRequired,
  updateClient: PropTypes.func.isRequired,
  deleteClient: PropTypes.func.isRequired,
  checkIfClientExists: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: getCurrentUser(state),
  projects: getProjects(state),
  loading: state.workspace.loading,
  clients: getClients(state),
  categories: getCategories(state),
  sprintDataExists: getSprints(state).length > 0,
});

const mapDispatchToProps = dispatch => ({
  loadWorkspace: workspace => dispatch(loadWorkspace(workspace)),
  joinWorkspace: code => dispatch(joinWorkspace(code)),
  loadUser: () => dispatch(loadUser()),
  addClient: client => dispatch(addClient(client)),
  updateClient: client => dispatch(updateClient(client)),
  deleteClient: id => dispatch(deleteClient(id)),
  checkIfClientExists: client => dispatch(checkIfClientExists(client)),
  addCategory: category => dispatch(addCategory(category)),
  updateCategory: category => dispatch(updateCategory(category)),
  deleteCategory: id => dispatch(deleteCategory(id)),
  checkIfCategoryExists: category => dispatch(checkIfCategoryExists(category)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);
