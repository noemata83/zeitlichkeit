import React from 'react';
import { List, ListItem, ListItemText, Checkbox, withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    title: {
        margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
    }
})

const Project = props => {
    const { project, tasks, classes } = props;
    return (<Grid item xs={12} md={6}>
        <Typography variant="title" className={classes.title}>{project}</Typography>
        <div>
            <List>
                {tasks.map(task => (<ListItem key={task.name}>
                    <Checkbox
                        checked={task.completed}
                        tabIndex={-1}
                    />
                    <ListItemText primary={task.name} />
                    </ListItem>))}
            </List>
        </div>
        </Grid>)
};

export default withStyles(styles)(Project);