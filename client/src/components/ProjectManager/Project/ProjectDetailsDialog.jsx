import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
// import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';

import { addProject, updateProject } from '../../../store/actions';

class ProjectDetailsDialog extends Component {
  static propTypes = {
    project: PropTypes.object,
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    clients: PropTypes.array.isRequired,
    editProject: PropTypes.func.isRequired,
  };
  static defaultProps = {
    project: undefined,
  };

  state = {
    rate: true,
    rateInput: 0,
    feeInput: 0,
    client: 'No client',
    name: '',
    id: null,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!nextProps.project) return { ...prevState, id: null };
    const newState = {};
    if (prevState.id !== nextProps.project.id) {
      newState.name = nextProps.project.name;
      if (+nextProps.project.fee !== 0) {
        newState.feeInput = +nextProps.project.fee;
        newState.rate = false;
      } else {
        newState.rateInput = +nextProps.project.rate;
      }
      if (nextProps.project.client) { newState.client = nextProps.project.client.name; }
    }
    return { ...newState, id: nextProps.project.id };
  }

  handleInput = event =>
    this.setState({ [event.target.name]: event.target.value });

  toggleRate = () => this.setState({ rate: !this.state.rate });

  resetForm = () => {
    this.setState({
      rate: true,
      rateInput: 0,
      feeInput: 0,
      client: 'No client',
      name: '',
      id: null,
    }, this.props.handleClose);
  }

  handleSubmit = () => {
    const project = {
      ...this.props.project,
      name: this.state.name,
      rate: this.state.rate ? this.state.rateInput : 0,
      fee: !this.state.rate ? this.state.feeInput : 0,
    };
    if (this.state.client !== 'No client') {
      project.client = {
        name: this.state.client,
      };
    } else {
      delete project.client;
    }
    if (this.props.project) {
      this.props.editProject(project);
    } else { 
      this.props.addProject(project);
    }
    this.resetForm();
  };

  renderCompensation = () =>
    (this.state.rate ? (
      <TextField
        label="Hourly Rate"
        value={this.state.rateInput}
        onChange={this.handleInput}
        inputProps={{
          name: 'rateInput',
          min: 0,
        }}
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        margin="normal"
      />
    ) : (
      <TextField
        label="Fixed Fee"
        value={this.state.feeInput}
        onChange={this.handleInput}
        inputProps={{
          name: 'feeInput',
          min: 0,
        }}
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        margin="normal"
      />
    ));

  render() {
    const { open, handleClose, clients } = this.props;
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{ this.props.project ? 'Edit Project Details' : 'Add New Project' }</DialogTitle>
        <DialogContent>
          <TextField
            type="text"
            label="Project Name"
            value={this.state.name}
            onChange={this.handleInput}
            fullWidth
            inputProps={{
              name: 'name',
            }}
          />
          <TextField
            name="client"
            select
            value={this.state.client}
            label="Client"
            onChange={this.handleInput}
          >
            <MenuItem value="No client">No client</MenuItem>
            {clients.map(client => (
              <MenuItem value={client.name} key={client.name}>
                {client.name}
              </MenuItem>
            ))}
          </TextField>
          {this.state.client !== 'No client' && (
            <div>
              {this.renderCompensation()}
              <FormControlLabel
                style={{ marginLeft: '2rem' }}
                control={
                  <Switch
                    checked={this.state.rate}
                    onChange={this.toggleRate}
                  />
                }
                label={this.state.rate ? 'Hourly' : 'Fixed Fee'}
              />

            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => this.handleSubmit()} color="primary">
            { this.props.project ? 'Update Project' : 'Add Project' }
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = state => ({
  clients: state.workspace.client_set,
});

const mapDispatchToProps = dispatch => ({
  addProject: project => dispatch(addProject(project)),
  editProject: project => dispatch(updateProject(project)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectDetailsDialog);
