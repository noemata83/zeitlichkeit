import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  color: {
    paddingLeft: '2rem',
    position: 'relative',
  },
  colorBox: {
    width: '1.5rem',
    height: '1.5rem',
    display: 'inline-block',
    position: 'absolute',
    top: '5px',
    left: '5px',
  },
};

const Category = (props) => {
  const {
    name,
    color,
    classes,
  } = props;
  return (
    <ListItem>
      <ListItemText primary={name} />
      <ListItemSecondaryAction>
        {/* Color picker goes here */}
        <div className={classes.color}>
          <div className={classes.colorBox} style={{ backgroundColor: color }} />
        </div>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

Category.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Category);
