import React from 'react';

export default props => {
    const { project, tasks } = props;
    return (<div>
        <h4>{project}</h4>
        <ul>
        {tasks.map(task => <li>{task.name}</li>)}
        </ul>
        </div>)
}