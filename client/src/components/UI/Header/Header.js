import React from 'react';
import classes from './Header.css';

const header = props => (
    <nav className={classes.Header}>
        <div className={classes.Brand}>
            Zeitlichkeit
        </div>
        <div className={classes.NavMenuContainer}>
            <div className={classes.NavMenu}>
                <div className={classes.NavMenuItem}>
                    Workspaces
                </div>
                <div className={classes.NavMenuItem}>
                    Team
                </div>
                <div className={classes.NavMenuItem}>
                    Logout
                </div>
            </div>
        </div>
    </nav>
)

export default header;