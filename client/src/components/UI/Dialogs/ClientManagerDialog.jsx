import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  Dialog,
  DialogTitle,
} from '@material-ui/core';


import ClientList from '../../ClientManager/ClientList/ClientList';
import ClientListControls from '../../ClientManager/ClientList/ClientListControls';
import getRandomColor from '../../../services/randomColor';
import { addClient, checkIfClientExists } from '../../../store/actions';

class ClientManagerDialog extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    clients: PropTypes.array.isRequired,
    checkIfClientExists: PropTypes.func.isRequired,
    addClient: PropTypes.func.isRequired,
  };

  state = {
    color: '',
    input: '',
    anchorEl: null,
  }

  componentDidMount() {
    if (this.state.color === '') {
      this.initColor();
    }
  }

  initColor = () => {
    this.setState({
      color: getRandomColor(),
    });
  }

  handleInput = (event) => {
    this.setState({
      input: event.target.value,
    });
  }

  handleOpen = event =>
    this.setState({
      anchorEl: event.currentTarget,
    });

  handleClose = () =>
    this.setState({
      anchorEl: null,
    });

  handleChangeComplete = (color) => {
    this.setState({ color: color.hex, anchorEl: null });
  }

  resetInput = () => {
    this.setState({
      input: '',
      color: getRandomColor(),
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.props.checkIfClientExists(this.state.input)) {
      return;
    }
    this.props.addClient({
      name: this.state.input,
      color: this.state.color,
    });
    this.resetInput();
  }

  render() {
    const {
      open,
      handleClose,
      clients,
    } = this.props;
    const {
      input,
      color,
      anchorEl,
    } = this.state;
    return (
      <Dialog
        style={{ fontSize: '2.5rem', padding: '2rem' }}
        maxWidth="md"
        fullWidth
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Manage Clients</DialogTitle>
        <div style={{ width: '80%', padding: '2rem', margin: '0 auto' }}>
          <ClientListControls
            input={input}
            handleInput={this.handleInput}
            handleSubmit={this.handleSubmit}
            color={color}
            anchorEl={anchorEl}
            handleOpen={this.handleOpen}
            handleClose={this.handleClose}
            handleChangeComplete={this.handleChangeComplete}
          />
          <div style={{ maxHeight: '50vh', overflowY: 'auto' }}>
            <ClientList
              clients={clients}
            />
          </div>
        </div>
      </Dialog>
    );
  }
}

const mapStateToProps = state => ({
  clients: state.workspace.client_set,
});

const mapDispatchToProps = dispatch => ({
  addClient: client => dispatch(addClient(client)),
  checkIfClientExists: client => dispatch(checkIfClientExists(client)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientManagerDialog);
