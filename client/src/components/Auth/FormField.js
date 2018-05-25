import React from 'react';
import { withStyles } from '@material-ui/core';
import styles from './formStyles';

export default withStyles(styles)(({ input, type, label, placeholder, classes, meta: {error, touched}}) => (
    <div className={classes.Field}>
        <input className={classes.input} {...input} type={type} placeholder={placeholder}/>
        <div style={{color: 'red'}}>
            {touched && error}
        </div>
    </div>
));