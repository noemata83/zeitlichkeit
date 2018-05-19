import React from "react";
import {
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Checkbox,
  IconButton,
  withStyles
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ProjectMenu from "./ProjectMenu";
import { Toolbar } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
  title: {
    display: 'inline-block',
    borderBottom: `1px solid gray`,
  }
});

const project = props => {
  const { project, tasks, classes, deleteTask } = props;
  return (
    <Grid item xs={12} md={6}>
        <Toolbar>
            <Typography variant="title" className={classes.title}>
                {project.name}
            </Typography>
            <ProjectMenu id={project.id} name={project.name}/>
        </Toolbar>
      <List>
        {tasks.map(task => (
          <ListItem key={task.name} divider>
            <Checkbox checked={task.completed} tabIndex={-1} />
            <ListItemText primary={task.name} />
            <ListItemSecondaryAction>
              <IconButton aria-label="Delete Task" onClick={() => deleteTask(task.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Grid>
  );
};

export default withStyles(styles)(project);
