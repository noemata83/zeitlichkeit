import React from 'react';
import { connect } from 'react-redux';

import classes from './Sprint.css';
import { TableRow, TableCell, Button } from 'material-ui';
import { deleteSprint } from '../../../store/actions';

const mapDispatchToProps = dispatch => {
    return {
        deleteSprint: (sprint_id) => dispatch(deleteSprint(sprint_id)),
    }
};

export default connect(null, mapDispatchToProps)(props => (
    <TableRow className={classes.Sprint}>
        <TableCell className={classes.name}>{props.label}</TableCell>
        <TableCell className={classes.start}>{props.sprint.start_time.toLocaleTimeString()}</TableCell>
        <TableCell className={classes.end}>{props.sprint.end_time.toLocaleTimeString()}</TableCell>
        <TableCell className={classes.duration}>{props.sprint.duration}</TableCell>
        <TableCell><Button onClick={() => props.deleteSprint(props.sprint.id)}>&times;</Button></TableCell>
    </TableRow>
));