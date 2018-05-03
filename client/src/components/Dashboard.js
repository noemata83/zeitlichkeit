import React, { Component } from 'react';
import classes from './Dashboard.css';

import Header from './UI/Header/Header';
import Workspace from './Workspace/Workspace';
import ManualSprintWidget from './Sidebar/ManualSprintWidget';

class Dashboard extends Component {
    render() {
        return (
            <div className={classes.Dashboard}>
                <Header />
                <main className={classes.Main}>
                    <div className={classes.SideBar}>
                        Sidebar
                        <ManualSprintWidget />
                    </div>
                    <div className={classes.Workspace}>
                        <Workspace />
                    </div>
                </main>
            </div>
        )
    }
}

export default Dashboard;