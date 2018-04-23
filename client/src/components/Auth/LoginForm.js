import React from 'react';
import { Field, reduxForm } from 'redux-form';

import classes from './Form.css';

const LoginForm = props => {
    const { handleLogin } = props;
    return (
    <div>
        <form onSubmit={props.handleSubmit(handleLogin)}>
            <div>
                <Field 
                    className={classes.Input}
                    name="username"
                    component="input"
                    type="text" 
                    placeholder="Username" />
            </div>
            <div>
                <Field
                    className={classes.Input}
                    name="password"
                    component="input"
                    type="password"
                    placeholder="Password" />
            </div>
            <button className={classes.Link} type="submit">Login</button>
        </form>
        <button className={classes.Link} onClick={() => props.switchMode('GREETING')}>Back</button>
    </div>
    );
}

export default reduxForm({
    form: 'login',
})(LoginForm);