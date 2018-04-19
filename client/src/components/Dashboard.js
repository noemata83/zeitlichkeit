import React, { Component } from 'react';
import classes from './Dashboard.css';

import Header from './UI/Header/Header';

class Dashboard extends Component {
    render() {
        return (
            <div className={classes.Dashboard}>
                <Header />
            </div>
        )
    }
}

export default Dashboard;