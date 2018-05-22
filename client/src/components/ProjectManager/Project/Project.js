import React from "react";
import {
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Checkbox,
  IconButton,
  withStyles,
  Input
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ProjectMenu from "./ProjectMenu";
import { Toolbar } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

const styles = theme => ({
  title: {
    display: "inline-block",
    borderBottom: `1px solid gray`
  },
  listItemSecondaryAction: {
    visibility: "hidden"
  },
  listItem: {
    "&:hover $listItemSecondaryAction": {
      visibility: "inherit"
    }
  },
  hideInput: {
    display: 'none',
  }
});

const project = props => {
  const { project, tasks, classes, deleteTask, addTaskToProject, showInput, handleInput, handleAddTask, inputValue, handleUpdateTaskCompleted } = props;
  return (
    <Grid item xs={12} md={6}>
      <Toolbar>
        <Typography variant="title" className={classes.title}>
          {project.name}
        </Typography>
        <ProjectMenu id={project.id} name={project.name} addTaskToProject={addTaskToProject} />
      </Toolbar>
      <List>
        {tasks.map(task => (
          <ListItem
            key={task.name}
            divider
            classes={{
              container: classes.listItem
            }}
          >
            <Checkbox 
              onChange={(event) => handleUpdateTaskCompleted(task, event.target.checked)}
              checked={task.completed} 
              tabIndex={-1} />
            <ListItemText primary={task.name} />
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
        ))}
          <ListItem className={!showInput ? classes.hideInput : null }>
            <form onSubmit={(e) => {e.preventDefault(); handleAddTask(project)}}>
              <Input type="text" name={`${project.name}__newTask`} onChange={handleInput} value={inputValue} fullWidth />
            </form>
          </ListItem>
      </List>
    </Grid>
  );
};

export default withStyles(styles)(project);
