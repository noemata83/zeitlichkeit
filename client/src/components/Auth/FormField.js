import React from 'react';
import classes from './Form.css';

export default ({ input, type, label, placeholder, meta: {error, touched}}) => (
    <div>
        <input className={classes.Input} {...input} type={type} placeholder={placeholder}/>
        <div style={{color: 'red'}}>
            {touched && error}
        </div>
    </div>
)