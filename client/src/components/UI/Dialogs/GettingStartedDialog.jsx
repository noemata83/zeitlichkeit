import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import { DialogTitle } from '@material-ui/core';
import Button from '@material-ui/core/Button';

const GettingStartedDialog = (props) => {
  const { open, handleClose } = props;
  return (
    <Dialog
      style={{ fontSize: '2.5rem', padding: '2rem' }}
      maxWidth="md"
      fullWidth
      open={open}
      onClose={handleClose}
    >
      <div style={{ padding: '2rem' }}>
        <DialogTitle>Getting Started with Temporalite!</DialogTitle>
        <div style={{ fontSize: '1.8rem', padding: '0 3rem' }}>
          <p>There&apos;s nothing like a blank workspace, no?</p>
          <p>
            The best way to get started with Temporalite is to use the
            navigation menu on the left. Click on &apos;Project Manager&apos;, and use the
            &apos;+&apos; button in the bottom right corner to create a Project.
          </p>
          <p>
            Once you have created a project, you can begin adding tasks within
            it, <strong>or</strong> you can use the time tracker widgets on the top lefthand
            side of the app to begin creating time entries. Each entry will
            automatically appear in the Time Tracker, and your data will also be
            automatically fed into the app&apos;s (currently quite primitive) data
            visualization pipeline (under &apos;Reports&apos;). Enjoy working with
            Temporalite!
          </p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Button variant="raised" color="primary" onClick={handleClose}>
            Thanks!
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default GettingStartedDialog;
