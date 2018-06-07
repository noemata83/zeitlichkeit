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

import { updateTask, deleteTask, checkIfCategoryExists, addCategory } from '../../../../store/actions/';
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
  taskText: {
    padding: '0 4rem 0 2rem !important',
  },
});

class Task extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    return { ...prevState, task: { ...nextProps.task } };
  }
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

  handleSubmit = (event) => {
    const { category, task } = this.state;
    event.preventDefault();
    if (!this.props.checkIfCategoryExists(category)) {
      this.props.addCategory({ name: category });
      while (!checkIfCategoryExists(category)) {} // eslint-disable-line
    }
    this.props.updateTask(task.id, { ...task, categories: [...task.categories, category] });
    this.handleClose();
  }

  updateCategoryInput = (event) => {
    if (event.target.value !== undefined) {
      this.setState({ category: event.target.value });
    }
  }

  deleteCategory = (oldTask, cat) => {
    const categories = oldTask.categories.filter(category => category !== cat);
    this.props.updateTask(oldTask.id, { ...oldTask, categories });
  }

  render() {
    const { task, classes } = this.props;
    const categoryList = task.categories.map(cat => (
      <CategoryChip key={`${task.name} - ${cat}`} cat={cat} task={task} deleteCategory={this.deleteCategory} />
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
              <div style={{ display: 'inline-block', marginRight: '1rem'}}>{task.name}</div>
              <div style={{ display: 'inline-block' }}>{categoryList}</div>
            </div>
          }
          classes={{ primary: task.completed ? classes.completed : null, root: classes.taskText }}
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
              onSubmit={this.handleSubmit}
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
            onClick={() => this.handleDeleteTask(task.id)}
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
  checkIfCategoryExists: category => dispatch(checkIfCategoryExists(category)),
  addCategory: category => dispatch(addCategory(category)),
});

Task.propTypes = {
  updateTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  checkIfCategoryExists: PropTypes.func.isRequired,
  addCategory: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  task: PropTypes.object.isRequired,
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(Task));
