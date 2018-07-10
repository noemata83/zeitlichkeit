import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import Card from '@material-ui/core/Card';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Watch from '@material-ui/icons/Watch';
import Timer from '@material-ui/icons/Timer';
import Divider from '@material-ui/core/Divider';
import AddCircle from '@material-ui/icons/AddCircle';

import SprintEntry from './SprintEntry';
// import ManualSprintWidget from './ManualSprintWidget';
// import TimerWidget from './TimerWidget';
import MODES from '../displayModes';

const styles = {
  drawerPaper: {
    position: 'relative',
    flexBasis: '300px',
    backgroundColor: '#F2f2f2',
    height: '92vh',
    maxWidth: '300px',
  },
  drawerPaperMobile: {
    flexBasis: '300px',
    backgroundColor: '#f2f2f2',
    height: '100vh',
    maxWidth: '300px',
  },
  tabRoot: {
    width: '100px',
    minWidth: '0px',
  },
};

class SideBar extends Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };
  render() {
    const { classes, setMode, handleCatDialogOpen } = this.props;
    const { value } = this.state;

    const drawer = (
      <div>
        <Card>
          <Tabs
            value={value}
            onChange={this.handleChange}
            fullWidth
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab className={classes.tabRoot} icon={<Timer />} />
            <Tab className={classes.tabRoot} icon={<AddCircle />} />
            <Tab className={classes.tabRoot} icon={<Watch />} />
          </Tabs>
          {value === 0 && <SprintEntry mode="timer" />}
          {value === 1 && <SprintEntry mode="manual" />}
          {value === 2 && <div>I will be a Pomodoro!</div>}
        </Card>
        <List component="nav">
          <ListItem button onClick={() => setMode(MODES.SPRINT)}>
            <ListItemText primary="Time Tracker" />
          </ListItem>
          <ListItem button onClick={() => setMode(MODES.PROJECT)}>
            <ListItemText primary="Project Manager" />
          </ListItem>
          <ListItem button onClick={() => setMode(MODES.REPORT)}>
            <ListItemText primary="Reports" />
          </ListItem>
          <ListItem button onClick={() => setMode(MODES.TEAM)}>
            <ListItemText primary="Team" />
          </ListItem>
          <Divider />
          <ListItem button onClick={handleCatDialogOpen}>
            <ListItemText primary="Manage Categories" />
          </ListItem>
        </List>
      </div>
    );
    return (
      <div>
        <Hidden smDown implementation="css">
          <Drawer variant="permanent" classes={{ paper: classes.drawerPaper }}>
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor="left"
            open={this.props.mobileOpen}
            onClose={this.props.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaperMobile,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
      </div>
    );
  }
}

SideBar.propTypes = {
  classes: PropTypes.object.isRequired,
  setMode: PropTypes.func.isRequired,
  mobileOpen: PropTypes.bool.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
  handleCatDialogOpen: PropTypes.func.isRequired,
};

export default withStyles(styles)(SideBar);
