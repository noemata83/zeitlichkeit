import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  ListItem,
  Checkbox,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Popover,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import FolderIcon from '@material-ui/icons/Folder';

import { updateTask, deleteTask } from '../../../../store/actions/';
import CategoryAutosuggest from '../../../UI/Forms/Autosuggest/CategoryAutosuggest';
import CategoryChip from '../../../UI/CategoryChip/CategoryChip';

const styles = theme => ({
  title: {
    display: 'inline-block',
    borderBottom: '1px solid gray',
  },
  hideInput: {
    display: 'none',
  },
  completed: {
    textDecoration: 'line-through',
    color: '#aaa',
    fontStyle: 'italic',
  },
  popup: {
    overflowY: 'visible !important',
    // position: 'relative',
  },
  popover: {
    margin: theme.spacing.unit * 2,
  },
});

class Task extends Component {
  state = {
    category: '',
    anchorEl: null,
  }

  handleOpen = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleClose = () => {
    this.setState({ anchorEl: null });
  }

  handleTaskUpdate = (id, task) => {
    this.props.updateTask(id, task);
  }

  handleDeleteTask = (taskId) => {
    this.props.deleteTask(taskId);
  };

  selectCategory = (category) => {
    this.setState({ category });
  }

  updateCategoryInput = (event) => {
    if (event.target.value !== undefined) {
      this.setState({ category: event.target.value });
    }
  }

  render() {
    const { task, classes } = this.props;
    const categoryList = task.categories.map(cat => (
      <CategoryChip key={`${task.name} - ${cat}`} cat={cat} />
    ));
    return (
      <ListItem
        key={task.name}
        divider
        classes={{
          container: classes.listItem,
        }}
      >
        <Checkbox
          onChange={event =>
            this.handleTaskUpdate(task.id, { ...task, completed: event.target.checked })
          }
          checked={task.completed}
          tabIndex={-1}
        />
        <ListItemText
          primary={
            <div>
              <span>{task.name}</span>
              {categoryList}
            </div>
          }
          classes={{ primary: task.completed ? classes.completed : null }}
        />
        <ListItemSecondaryAction
          className={classes.listItemSecondaryAction}
        >
          <IconButton
            aria-label="Change Categories"
            onClick={this.handleOpen}
          >
            <FolderIcon />
          </IconButton>
          <Popover
            open={Boolean(this.state.anchorEl)}
            anchorEl={this.state.anchorEl}
            onClose={this.handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            elevation={1}
            classes={{ paper: classes.popup }}
          >
            <form
              onSubmit={(event) => {
                event.preventDefault();
                this.handleTaskUpdate(task.id, {
                    ...task,
                    categories: [...task.categories, this.state.category],
                });
                }
              }
              className={classes.popover}
            >
              <CategoryAutosuggest
                task={task}
                category={this.state.category}
                updateCategoryInput={this.updateCategoryInput}
                selectCategory={this.selectCategory}
              />
            </form>
          </Popover>
          <IconButton
            aria-label="Delete Task"
            onClick={() => deleteTask(task.id)}
          >
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  deleteTask: taskId => dispatch(deleteTask(taskId)),
  updateTask: (id, task) => dispatch(updateTask(id, task)),
});

Task.propTypes = {
  updateTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  task: PropTypes.object.isRequired,
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(Task));
