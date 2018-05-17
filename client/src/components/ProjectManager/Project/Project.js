import React from 'react';

export default props => {
    const { project, tasks } = props;

    return (<div>
        <h4>{project.name}</h4>
        <ul>
        {tasks.map(task => <li>{task.name}</li>)}
        </ul>
        </div>)
}