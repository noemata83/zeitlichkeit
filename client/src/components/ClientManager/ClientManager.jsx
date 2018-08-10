/* Deprecated component */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addClient, checkIfClientExists } from '../../store/actions';
import ClientListControls from './ClientList/ClientListControls';
import ClientList from './ClientList/ClientList';
import getRandomColor from '../../services/randomColor';
import { getClients } from '../../store/reducers';


class ClientManager extends Component {
  static propTypes = {
    clients: PropTypes.array.isRequired,
    checkIfClientExists: PropTypes.func.isRequired,
    addClient: PropTypes.func.isRequired,
  };

  state = {
    input: '',
    color: '',
    anchorEl: null,
  };

  componentDidMount() {
    if (this.state.color === '') {
      this.initColor();
    }
  }

  initColor = () => {
    this.setState({
      color: getRandomColor(),
    });
  };

  handleInput = (event) => {
    this.setState({
      input: event.target.value,
    });
  };

  handleOpen = event =>
    this.setState({
      anchorEl: event.currentTarget,
    });

  handleClose = () =>
    this.setState({
      anchorEl: null,
    });

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
  };

  render() {
    const { clients } = this.props;
    const { input, color, anchorEl } = this.state;
    return (
      <div style={{ fontSize: '2.5rem', padding: '2rem' }}>
        <h1>Manage Task Categories</h1>
        <div style={{ width: '50%', padding: '2rem', margin: '0 auto' }}>
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
          <ClientList clients={clients} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  clients: getClients(state),
});

const mapDispatchToProps = dispatch => ({
  addClient: client => dispatch(addClient(client)),
  checkIfClientExists: client => dispatch(checkIfClientExists(client)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientManager);
