import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Checkbox,
  withStyles
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ProjectMenu from "./ProjectMenu";
import { Toolbar } from "@material-ui/core";

const styles = theme => ({
  title: {
    display: 'inline-block',
    borderBottom: `1px solid gray`,
  }
});

const project = props => {
  const { project, tasks, classes } = props;
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
          </ListItem>
        ))}
      </List>
    </Grid>
  );
};

export default withStyles(styles)(project);
