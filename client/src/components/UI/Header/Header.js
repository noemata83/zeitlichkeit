import React from 'react';
import classes from './Header.css';
import clockIcon from '../../../assets/img/clock-icon.svg';

const header = props => (
    <nav className={classes.Header}>
        <img src={clockIcon} className={classes.Logo} alt="TemporaLite" />
        <div className={classes.Brand}>
            Temporalite
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