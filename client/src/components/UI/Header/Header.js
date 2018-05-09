import React from 'react';
import classes from './Header.css';
import clockIcon from '../../../assets/img/clock-icon.svg';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { withStyles, withTheme } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';

const header = props => {
    const styles = {
        root: {
            flexGrow: 1,
            height: '4.5rem',
        },
        title: {
            fontSize: '2.5rem',
            color: props.theme.palette.primary.contrastText,
        padding: '1rem 2rem 1rem .5rem',
        display: 'inline-block',
        margin: '0 auto 0 0',
        }
    }
    return (
    <AppBar color="primary" style={styles.root} position='static'>
        <Toolbar disableGutters>
            <IconButton>
                <img src={clockIcon} className={classes.Logo} alt="TemporaLite" />
            </IconButton>
            <Typography variant="title" style={styles.title}>    
                Temporalite
            </Typography>
        <div className={classes.NavMenuContainer}>
            <div className={classes.NavMenu}>
                <div className={classes.NavMenuItem}>
                    Workspaces
                </div>
                <div className={classes.NavMenuItem}>
                    Team
                </div>
                <div className={classes.NavMenuItem}>
                    Logout
                </div>
            </div>
        </div>
        </Toolbar>
    </AppBar>
    );
}
export default withTheme()(header);