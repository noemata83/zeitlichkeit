import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import { DialogTitle } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

const IntroDialog = (props) => {
    const {
      open,
      handleClose,
    } = props;
    return (
        <Dialog
          style={{ fontSize: '2.5rem', padding: '2rem' }}
          maxWidth="md"
          fullWidth
          open={open}
          onClose={handleClose}
        >
        <div style={{ padding: '2rem' }}>
            <DialogTitle>Welcome to Temporalite!</DialogTitle>
            <div style={{ fontSize: '1.8rem', padding: '0 3rem' }} >
              <p>
                <strong>June 11, 2018 Update</strong>: An issue in the Material UI library is
                occasionally causing the styling of the user interface of the production build
                to break. If, when you login, things look <em>weird</em>, simply reload the page.
                We're working on it!
              </p>
                <Divider />
                <p>
                  Temporalite aims to be a lightweight time-tracker and productivity management
                  tool. Temporalite allows you (and, ultimately, your team) to track, categorize,
                  and visualize the time that you work.
                </p>
                <p>
                  This application is a prototype, and its functionality is being developed
                  continuously. Many features, especially in data visualization and collaboration, are
                  at a very early stage of development. Please check back often to see the app evolve!
                </p>
                <p>
                  To get started, create a user by clicking 'Register': enter any user name and password,
                  and you will be taken to the dashboard, where you can begin logging your time,
                  building your todo list, and visualizing your productivity. Enjoy.
                </p>
            </div>
            <div style={{textAlign: 'center'}}>
                <Button 
                  variant="raised"
                  color="primary"
                  onClick={handleClose}
                >Thanks!</Button>
            </div>
         </div>
        </Dialog>
    );
};

export default IntroDialog;