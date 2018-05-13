import React from 'react';
import { Field, reduxForm } from 'redux-form';

import classes from './Form.css';
import FormField from './FormField';

const formFields = [
    {name: 'username', type:'text', label: 'Username'},
    {name: 'password', type:'password', label: 'Password'},
    {name: 'confirmpassword', type:'password', label: 'Confirm Password'}
];

const renderFields = formFields.map(({name, type, label}) => (
    <div key={name} style={{display:'inline-block', width: '50%'}}>
                <Field 
                    name={name}
                    component={FormField}
                    type={type} 
                    placeholder={label} />
            </div>
))

const RegistrationForm = props => {
    const { handleRegistration } = props;
    return (
    <div>
        <form onSubmit={props.handleSubmit(handleRegistration)}>
            {renderFields}
            <button className={classes.Link} type="submit">Register</button>
            <button className={classes.Back} onClick={() => props.switchMode('GREETING')}>Back</button>
        </form>
    </div>
    );
}

function validate(values) {
    const errors = {};

    if (values['password'] !== values['confirmpassword']) {
        errors['confirmpassword'] = "Passwords must match.";
    }
    
    formFields.forEach(({name}) => {
        
        if (!values[name]) {
            errors[name] = "You must enter a value.";
        }
    });

    console.log(errors);
    return errors;
}

export default reduxForm({
    validate,
    form: 'register',
})(RegistrationForm);