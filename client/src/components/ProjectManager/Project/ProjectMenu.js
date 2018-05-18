import React, { Component } from "react";
import { connect } from 'react-redux';
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Menu, MenuItem, IconButton } from "@material-ui/core";
import { deleteProject } from '../../../store/actions';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    button: {
        display: 'inline-block',
        marginLeft: 'auto',
    }
}

class ProjectMenu extends Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const { id, name, deleteProject, classes } = this.props;
    return (
      <div className={classes.button}>
        <IconButton
          aria-owns={anchorEl ? "project-menu" : null}
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
          <MenuItem onClick={() => deleteProject(id, name)}>
            Delete Project
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteProject: (id, name) => dispatch(deleteProject(id, name))
    }
}

ProjectMenu = withStyles(styles)(ProjectMenu);

export default connect(null, mapDispatchToProps)(ProjectMenu);
