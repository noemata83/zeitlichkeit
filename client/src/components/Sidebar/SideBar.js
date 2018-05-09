import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';

import ManualSprintWidget from './ManualSprintWidget';

const styles = theme => ({
    drawerPaper: {
        position: 'relative',
        flexBasis: '300px',
        backgroundColor: "#F2f2f2"
    }
})

class SideBar extends Component {
    render() {
        const { classes } = this.props;
        return (
            <Drawer variant="permanent" classes={{paper: classes.drawerPaper}}>
                <ManualSprintWidget />
            </Drawer>
        );
    }
}

export default withStyles(styles)(SideBar);