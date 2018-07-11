import React from 'react';
import { connect } from 'react-redux';
import { Button, ListItem, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';


import classes from './Sprint.css';
import { deleteSprint } from '../../../store/actions';

const mapDispatchToProps = dispatch => ({
  deleteSprint: sprint_id => dispatch(deleteSprint(sprint_id)),
});

export default connect(null, mapDispatchToProps)(props => (
  <ListItem classes={{ root: classes.Sprint }}>
    <ListItemText
      className={classes.name}
      primary={
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingRight: '3.3rem',
          }}
        >
          <span>
            {props.label}
          </span>
          <span style={{ marginLeft: 'auto' }}>
            {`${props.sprint.start_time.toLocaleTimeString()} - ${props.sprint.end_time.toLocaleTimeString()}`}
          </span>
        </div>}
      secondary={props.sprint.duration}
    />
    <ListItemSecondaryAction>
      <Button
        onClick={() => props.deleteSprint(props.sprint.id)}
      >
        {/* &times; */}
        <DeleteIcon />
      </Button>
    </ListItemSecondaryAction>
  </ListItem>
));
