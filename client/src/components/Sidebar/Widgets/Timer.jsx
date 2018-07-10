import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PlayArrow from '@material-ui/icons/PlayArrow';
import Stop from '@material-ui/icons/Stop';
import { FormControl } from '@material-ui/core';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  Timer: {
    margin: theme.spacing.unit * 4,
    display: 'block',
    textAlign: 'center',
    fontSize: '3rem',
  },
});

export default withStyles(styles)((props) => {
  const {
    classes,
    handleStart,
    handleStop,
    timing,
    displayTimer,
    counter,
  } = props;
  return (
    <FormControl>
      <div className={classes.Timer}>
        {timing ? displayTimer(counter) : '00:00:00'}
      </div>
      <Button
        variant="raised"
        color="secondary"
        type="button"
        onClick={() => (timing ? handleStop() : handleStart())}
      >
        {timing ? <Stop /> : <PlayArrow />}
      </Button>
    </FormControl>
  );
});
