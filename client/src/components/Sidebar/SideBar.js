import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Watch from '@material-ui/icons/Watch';
import Timer from '@material-ui/icons/Timer';
import AddCircle from '@material-ui/icons/AddCircle';

import ManualSprintWidget from './ManualSprintWidget';
import TimerWidget from './TimerWidget';
import MODES from '../displayModes';

const styles = theme => ({
    drawerPaper: {
        position: 'relative',
        flexBasis: '300px',
        backgroundColor: "#F2f2f2",
        height: '92vh',
        maxWidth: '300px'
    },
    tabRoot: {
        width: '100px',
        minWidth: '0px'
    }
})

class SideBar extends Component {
    state = {
        value: 0,
    }

    handleChange = (event, value) => {
        this.setState({ value });
    }
    render() {
        const { classes, setMode } = this.props;
        const { value } = this.state;
        return (
            <Drawer variant="permanent" classes={{paper: classes.drawerPaper}}>
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
                {value === 0 && <TimerWidget/>}
                {value === 1 && <ManualSprintWidget /> }
                {value === 2 && <div>I'll be a Pomodoro!</div>}
                </Card>
                <List component="nav">
                    <ListItem button onClick={() => setMode(MODES.SPRINT)}>
                        <ListItemText primary="Sprints" />
                    </ListItem>
                    <ListItem button onClick={() => setMode(MODES.PROJECT)}>
                        <ListItemText primary="Projects" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Reports" />
                    </ListItem>
                </List>
            </Drawer>
        );
    }
}

export default withStyles(styles)(SideBar);