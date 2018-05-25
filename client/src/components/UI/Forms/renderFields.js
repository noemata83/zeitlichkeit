import React from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import { Input } from '@material-ui/core';

export const renderTimeField = ({
    input,
    label,
    meta: {touched, error},
    ...custom
}) => (
    <TextField 
    label={label} 
    type="time"
    InputLabelProps={{shrink:true}}
    {...input}
    {...custom} />
);

export const renderDateField = ({
    input,
    label,
    meta: {touched, error},
    ...custom
}) => (
    <TextField 
    label={label} 
    type="date"
    fullWidth 
    InputLabelProps={{shrink:true}}
    {...input}
    {...custom} />
);

export const renderSelectField = ({
    input,
    inputProps,
    label,
    children,
    ...custom
}) => {
    return (
    <Select
        {...input}
        inputProps={{...inputProps}}
        {...custom}
     >{children}</Select>
    );
}

export const renderTextField = ({
    inputProps,
    label,
    ...custom
}) => (
    <TextField
        label={label}
        type="text"
        inputProps={{...inputProps}}
        InputLabelProps={{shrink:true}}
        {...custom}
    />
);

export const renderInput = ({
    inputProps,
    placeholder,
    ...custom
}) => (
    <Input
        placeholder={placeholder}
        inputProps={{...inputProps}}
        fullWidth
        {...custom}
    />
);