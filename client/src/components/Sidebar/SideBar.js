import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import Card from 'material-ui/Card';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Tabs, { Tab } from 'material-ui/Tabs';
import Watch from '@material-ui/icons/Watch';
import Timer from '@material-ui/icons/Timer';
import AddCircle from '@material-ui/icons/AddCircle';

import ManualSprintWidget from './ManualSprintWidget';
import TimerWidget from './TimerWidget';

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
        const { classes } = this.props;
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
                    <ListItem button>
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