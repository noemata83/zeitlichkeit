/* Deprecated Component */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { withStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import IconButton from '@material-ui/core/IconButton';
import { Popover } from '@material-ui/core';
import { BlockPicker } from 'react-color';
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteClient, updateClient } from '../../../store/actions';
import colors from '../../../services/colors';


const styles = {
  color: {
    paddingLeft: '2rem',
    height: '100%',
  },
  colorBox: {
    width: '2rem',
    height: '2rem',
    display: 'inline-block',
    position: 'absolute',
    top: '50%',
    left: 0,
    transform: 'translateY(-50%)',
    outline: 'none',
    border: 'none',
    marginRight: '1rem',
  },
};

class Client extends Component {
  state = {
    anchorEl: null,
    color: null,
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return { ...prevState, color: nextProps.color };
  }

  handleDelete = () => {
    this.props.deleteClient(this.props.id);
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
    this.props.updateClient({ id: this.props.id, name: this.props.name, color: color.hex });
  }

  render() {
    const {
      name,
      classes,
    } = this.props;
    const {
      color,
      anchorEl,
    } = this.state;
    return (
      <ListItem>
        <ListItemIcon>
          <button type="button" className={classes.colorBox} style={{ backgroundColor: color }} onClick={this.handleOpen} />
        </ListItemIcon>
        <ListItemText primary={name} />
        <ListItemSecondaryAction>
          <IconButton>
            <DeleteIcon onClick={this.handleDelete} />
          </IconButton>
        </ListItemSecondaryAction>
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <BlockPicker
            colors={colors}
            color={color}
            onChangeComplete={this.handleChangeComplete}
          />
        </Popover>
      </ListItem>
    );
  }
}

Client.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  // Eslint is disabled for the next line, because it cannot seem to see that
  // I *am* using the color prop to define state.
  color: PropTypes.string.isRequired, // eslint-disable-line
  classes: PropTypes.object.isRequired,
  deleteClient: PropTypes.func.isRequired,
  updateClient: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  deleteClient: id => dispatch(deleteClient(id)),
  updateClient: client => dispatch(updateClient(client)),
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(Client));
