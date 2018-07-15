import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Popover from '@material-ui/core/Popover';
import { withStyles } from '@material-ui/core/styles';
import { BlockPicker } from 'react-color';

import colors from '../../services/colors';

const styles = {
  container: {
    width: '100%',
    display: 'flex',
  },
  input: {
    flexBasis: '90%',
    flexGrow: 1,
  },
  color: {
    flexBasis: '10%',
    flexGrow: 1,
    position: 'relative',
  },
  colorBox: {
    width: '2.5rem',
    outline: 'none',
    border: 'none',
    height: '2.5rem',
    display: 'block',
    position: 'absolute',
    bottom: '.5rem',
    left: '50%',
    transform: 'translateX(-50%)',
  },
};

const managerListControls = (props) => {
  const {
    inputName,
    inputLabel,
    handleInput,
    handleSubmit,
    input,
    color,
    handleChangeComplete,
    anchorEl,
    classes,
    handleOpen,
    handleClose,
  } = props;
  return (
    <form
      onSubmit={handleSubmit}
      style={{ width: '100%' }}
    >
      <div className={classes.container}>
        <div className={classes.input}>
          <TextField
            name={inputName}
            label={inputLabel}
            onChange={handleInput}
            value={input}
            fullWidth
          />
        </div>
        <div className={classes.color}>
          <button type="button" className={classes.colorBox} onClick={handleOpen} style={{ backgroundColor: color }} />
          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <BlockPicker
              colors={colors}
              color={color}
              onChangeComplete={handleChangeComplete}
            />
          </Popover>
        </div>
      </div>
    </form>
  );
};

managerListControls.defaultProps = {
  anchorEl: null,
};

managerListControls.propTypes = {
  inputName: PropTypes.string.isRequired,
  inputLabel: PropTypes.string.isRequired,
  handleInput: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChangeComplete: PropTypes.func.isRequired,
  handleOpen: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  input: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  anchorEl: PropTypes.object,
};

export default withStyles(styles)(managerListControls);
