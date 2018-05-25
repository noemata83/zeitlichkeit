import React from 'react';
import { Field, reduxForm } from 'redux-form';
import FormField from './FormField';
import { withStyles } from '@material-ui/core';
import styles from './formStyles';
// const styles = theme => ({
//     input: {
//             background: 'transparent',
//             border: 0,
//             borderBottom: '1px solid white',
//             outline: 'none',
//             display: 'inline-block',
//             fontSize: '2rem',
//             margin: '0 .5rem',
//             paddingBottom: '1rem',
//             color: '#fff',
//             maxWidth: '100%',
//             flexGrow: 0,
//     },
//     Link: {
//         '&:visited': {
//             display: 'inline-block',
//             width: '50%',
//             cursor: 'pointer',
//             textAlign: 'right',
//             fontSize: '2rem',
//             padding: 0,
//             margin: '1rem 0',
//             textDecoration: 'none',
//             color: '#fff',
//             backgroundColor: 'transparent',
//             boxSizing: 'border-box',
//             outline: 'none',
//             border: 'none',
//             '&:hover': {
//                 textDecoration: 'underline',
//                 fontWeight: 'bold',
//             }
//         },
//         display: 'inline-block',
//         width: '50%',
//         cursor: 'pointer',
//         textAlign: 'right',
//         fontSize: '2rem',
//         padding: 0,
//         margin: '1rem 0',
//         textDecoration: 'none',
//         color: '#fff',
//         backgroundColor: 'transparent',
//         boxSizing: 'border-box',
//         outline: 'none',
//         border: 'none',
//         '&:hover': {
//             textDecoration: 'underline',
//             fontWeight: 'bold',
//         }
//     },
//     Back: { 
//         marginLeft: '1rem'
//     },
//     Field: {
//         display: 'inline-block',
//         flexBasis: '50%'
//     },
//     Form: {
//         display: 'flex',
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//     },
//     Controls: {
//         paddingTop: '1rem',
//         display: 'flex',
//         justifyContent: 'space-around',
//         width: '100%'
//     }
// });


const LoginForm = props => {
    const { handleLogin, classes } = props;
    return (
        <form onSubmit={props.handleSubmit(handleLogin)} className={classes.Form}>
            <div className={classes.Fields}>
                    <Field 
                        name="username"
                        component={FormField}
                        type="text" 
                        placeholder="Username" />
                    <Field
                        name="password"
                        component={FormField}
                        type="password"
                        placeholder="Password" />
            </div>
            <div className={classes.Controls}>
                <button className={classes.Link} type="submit">Login</button>
                <button className={[classes.Link, classes.Back].join(' ')} onClick={() => props.switchMode('GREETING')}>Back</button>
            </div>
        </form>
    );
}

export default reduxForm({
    form: 'login',
})(withStyles(styles)(LoginForm));