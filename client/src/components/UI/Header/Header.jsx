import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Menu, MenuItem } from '@material-ui/core';
import * as actions from '../../../store/actions';
import clockIcon from '../../../assets/img/clock-icon.svg';

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '4.5rem',
  },
  title: {
    fontSize: '2.5rem',
    color: theme.palette.primary.contrastText,
    padding: '1rem 2rem 1rem .5rem',
    display: 'inline-block',
    margin: '0 auto 0 0',
  },
  navIconHide: {
    color: 'white',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  Header: {
    backgroundColor: '#4F4F4F',
    height: '4.5rem',
    display: 'flex',
  },
  Brand: {
    fontSize: '2.5rem',
    color: '#fff',
    padding: '1rem 2rem 1rem .5rem',
    display: 'inline-block',
    marginRight: 'auto',
  },
  Logo: {
    padding: '1rem .5rem',
    height: '25px',
    width: '25px',
    color: 'white',
  },
  AccountIcon: {
    marginRight: '1rem',
  },
  AccountCircle: {
    fontSize: '3.5rem',
  },
});

const header = (props) => {
  const {
    classes,
    anchorEl,
    handleMenu,
    handleClose,
    handleSWDialogOpen,
    handleJWDialogOpen,
  } = props;
  const open = Boolean(anchorEl);
  return (
    <AppBar color="primary" style={styles.root} position="static">
      <Toolbar disableGutters>
        <IconButton
          aria-label="open drawer"
          onClick={props.handleDrawerToggle}
          className={classes.navIconHide}
        >
          <MenuIcon />
        </IconButton>
        <IconButton>
          <img src={clockIcon} className={classes.Logo} alt="TemporaLite" />
        </IconButton>
        <Typography variant="title" className={classes.title}>
          Temporalite
        </Typography>
        <IconButton
          aria-owns={open ? 'menu-appbar' : null}
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
          className={classes.AccountIcon}
        >
          <AccountCircle classes={{ root: classes.AccountCircle }} />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose} disabled>Profile</MenuItem>
          <MenuItem onClick={handleSWDialogOpen}>Switch Workspace</MenuItem>
          <MenuItem onClick={handleJWDialogOpen}>Join Workspace</MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              props.logout();
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(actions.logout()),
});

header.defaultProps = {
  anchorEl: null,
};

header.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line
  handleMenu: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSWDialogOpen: PropTypes.func.isRequired,
  handleJWDialogOpen: PropTypes.func.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  anchorEl: PropTypes.object,
};

export default connect(null, mapDispatchToProps)(withStyles(styles, { withTheme: true })(header));
