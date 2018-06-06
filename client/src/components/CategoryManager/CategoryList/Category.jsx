import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { withStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';


const styles = {
  color: {
    paddingLeft: '2rem',
    height: '100%',
  },
  colorBox: {
    width: '2rem',
    height: '2rem',
    display: 'inline-block',
    position: 'absolute',
    top: '50%',
    left: 0,
    transform: 'translateY(-50%)',
    outline: 'none',
    border: 'none',
    marginRight: '1rem',
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
      <ListItemIcon>
        <button type="button" className={classes.colorBox} style={{ backgroundColor: color }} />
      </ListItemIcon>
      <ListItemText primary={name} />
      <ListItemSecondaryAction>
        <IconButton>
          <DeleteIcon />
        </IconButton>
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
