/*  This component is used to render form fields within the auth-related components, allowing errors
    to be programmatically displayed. */
    
import React from 'react';
import { withStyles } from '@material-ui/core';
import styles from './formStyles';

export default withStyles(styles)(({ input, type, label, placeholder, classes, meta: {error, touched}}) => (
    <div className={classes.Field}>
        <input className={classes.input} {...input} type={type} placeholder={placeholder} size="17"/>
        <div className={classes.Error}>
            {touched && error}
        </div>
    </div>
));