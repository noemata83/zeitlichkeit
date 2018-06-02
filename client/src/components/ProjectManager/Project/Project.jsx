// A stateless component for displaying a single project and its associated tasks.
import React from 'react';
import {
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Checkbox,
  IconButton,
  withStyles,
  TextField,
  Toolbar,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ProjectMenu from './ProjectMenu';
import CategoryChip from '../../UI/CategoryChip/CategoryChip';

const styles = {
  title: {
    display: 'inline-block',
    borderBottom: '1px solid gray',
  },
  listItemSecondaryAction: {
    visibility: 'hidden',
  },
  listItem: {
    '&:hover $listItemSecondaryAction': {
      visibility: 'inherit',
    },
  },
  hideInput: {
    display: 'none',
  },
  completed: {
    textDecoration: 'line-through',
    color: '#aaa',
    fontStyle: 'italic',
  },
};

export default withStyles(styles)((props) => {
  const {
    project,
    tasks,
    classes,
    deleteTask,
    addTaskToProject,
    showInput,
    handleInput,
    handleAddTask,
    inputValue,
    handleUpdateTaskCompleted,
  } = props;
  return (
    <Grid item xs={12} md={6}>
      <Toolbar>
        <Typography variant="title" className={classes.title}>
          {project.name}
        </Typography>
        <ProjectMenu
          id={project.id}
          name={project.name}
          addTaskToProject={addTaskToProject}
        />
      </Toolbar>
      <List>
        {tasks.map((task) => {
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
                  handleUpdateTaskCompleted(task, event.target.checked)
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
                  aria-label="Delete Task"
                  onClick={() => deleteTask(task.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
        <ListItem className={!showInput ? classes.hideInput : null}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddTask(project);
            }}
            style={{ width: '100%' }}
          >
            <TextField
              name={`${project.name}__newTask`}
              placeholder={`New task under ${project.name}`}
              onChange={handleInput}
              value={inputValue}
              fullWidth
            />
          </form>
        </ListItem>
      </List>
    </Grid>
  );
});
