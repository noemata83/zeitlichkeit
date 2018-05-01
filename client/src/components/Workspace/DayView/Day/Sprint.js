import React from 'react';

import classes from './Sprint.css';

export default props => (
    <div>
        {props.sprint.task} <br/>
        {props.sprint.start_time.toLocaleTimeString()} <br />
        {props.sprint.end_time.toLocaleTimeString()} <br />
        {props.sprint.duration} <br />
        <br/>
    </div>
)