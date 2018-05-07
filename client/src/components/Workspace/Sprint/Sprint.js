import React from 'react';

import classes from './Sprint.css';

export default props => (
    <div className={classes.Sprint}>
        <div className={classes.name}>{props.label}</div>
        <div className={classes.detail}>
            <div className={classes.start}>{props.sprint.start_time.toLocaleTimeString()}</div>
            <div className={classes.end}>{props.sprint.end_time.toLocaleTimeString()}</div>
            <div className={classes.duration}>{props.sprint.duration}</div>
        </div>
    </div>
);