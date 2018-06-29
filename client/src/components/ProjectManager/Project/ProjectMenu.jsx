// Stateful component implements a menu for managing projects: adding tasks, deleting projects, &c.
import React, { Component } from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { withStyles } from '@material-ui/core/styles';
import { Menu, MenuItem, IconButton } from '@material-ui/core';

const styles = {
  button: {
    display: 'inline-block',
    marginLeft: 'auto',
  },
};

class ProjectMenu extends Component {
  state = {
    anchorEl: null,
  };

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const {
      id,
      name,
      deleteProject,
      addTaskToProject,
      classes,
    } = this.props;
    return (
      <div className={classes.button}>
        <IconButton
          aria-owns={anchorEl ? 'project-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="project-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={() => addTaskToProject(id, name)}>
            Add Task
          </MenuItem>
          <MenuItem onClick={() => deleteProject(id, name)}>
            Delete Project
          </MenuItem>
        </Menu>
      </div>
    );
  }
}


ProjectMenu.defaultProps = {
  classes: styles,
};

ProjectMenu.propTypes = {
  id: PropTypes.number.isRequired,
  deleteProject: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  addTaskToProject: PropTypes.func.isRequired,
  classes: PropTypes.shape({
    button: PropTypes.string,
  }),
};

export default withStyles(styles)(ProjectMenu);
