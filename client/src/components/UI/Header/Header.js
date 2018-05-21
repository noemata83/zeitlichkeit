import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

import clockIcon from '../../../assets/img/clock-icon.svg';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = theme => ({
    root: {
        flexGrow: 1,
        height: '4.5rem',
    },
    title: {
        fontSize: '2.5rem',
        color: theme.palette.primary.contrastText,
        padding: '1rem 2rem 1rem .5rem',
        display: 'inline-block',
        margin: '0 auto 0 0',
    },
    navIconHide: {
        color: 'white',
        [theme.breakpoints.up('md')]: {
            display: 'none',
          },
    },
    Header: {
        backgroundColor: '#4F4F4F',
        height: '4.5rem',
        display: 'flex',
    },    
    Brand: {
        fontSize: '2.5rem',
        color: '#fff',
        padding: '1rem 2rem 1rem .5rem',
        display: 'inline-block',
        marginRight: 'auto',
    },
    NavMenu: {
        display: 'flex'
    },
    NavMenuItem: {
        fontSize: '2rem',
        color: '#fff',
        padding: '1rem',
        margin: '.2rem 2rem',
    },
    Logo: {
        padding: '1rem .5rem',
        height: '25px',
        width: '25px',
        color: 'white'
    }
});

const header = props => {
    const { classes } = props;
    return (
    <AppBar color="primary" style={styles.root} position='static'>
        <Toolbar disableGutters>
            <IconButton 
                aria-label="open drawer"
                onClick={props.handleDrawerToggle}
                className={classes.navIconHide}>
                <MenuIcon />
            </IconButton>
            <IconButton>
                <img src={clockIcon} className={classes.Logo} alt="TemporaLite" />
            </IconButton>
            <Typography variant="title" className={classes.title}>    
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
                <div className={classes.NavMenuItem} onClick={() => props.logout()}>
                    Logout
                </div>
            </div>
        </div>
        </Toolbar>
    </AppBar>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout())
    }
}

export default connect(null, mapDispatchToProps)(withStyles(styles, {withTheme:true})(header));