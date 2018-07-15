import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

import ManagerListControls from '../../ListManager/ManagerListControls';
import ManagerList from '../../ListManager/ManagerList';

import getRandomColor from '../../../services/randomColor';

class ManagerDialog extends Component {
  state = {
    color: '',
    input: '',
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

  handleInput = event =>
    this.setState({
      input: event.target.value,
    });

  handleOpen = event =>
    this.setState({
      anchorEl: event.currentTarget,
    });

  handleClose = () =>
    this.setState({
      anchorEl: null,
    });

  handleChangeComplete = color =>
    this.setState({ color: color.hex, anchorEl: null });

  resetInput = () =>
    this.setState({
      input: '',
      color: getRandomColor(),
    });

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.props.checkForDuplicate(this.state.input)) {
      return;
    }
    this.props.add({
      name: this.state.input,
      color: this.state.color,
    });
    this.resetInput();
  };

  render() {
    const {
      open,
      handleClose,
      dialogTitle,
      inputName,
      inputLabel,
      items,
      update,
      deleteItem,
    } = this.props;
    const { input, color, anchorEl } = this.state;
    return (
      <Dialog
        style={{ fontSize: '2.5rem', padding: '2rem' }}
        maxWidth="md"
        fullWidth
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>{dialogTitle}</DialogTitle>
        <div style={{ width: '80%', padding: '2rem', margin: '0 auto' }}>
          <ManagerListControls
            inputName={inputName}
            inputLabel={inputLabel}
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
            <ManagerList
              items={items}
              update={update}
              deleteItem={deleteItem}
            />
          </div>
        </div>
      </Dialog>
    );
  }
}

ManagerDialog.propTypes = {
  checkForDuplicate: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  add: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  inputName: PropTypes.string.isRequired,
  inputLabel: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  dialogTitle: PropTypes.string.isRequired,
};

export default ManagerDialog;
