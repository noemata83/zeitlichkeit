import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  TextField,
  Button,
} from '@material-ui/core';

const inviteToWorkspaceDialog = (props) => {
  const {
    handleClose,
    open,
    handleSendInvite,
    handleRecipientInput,
    recipient,
  } = props;
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle id="workspace-invite-dialog-title">
        Invite a User to Join this Workspace
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
            Enter one valid email address to send an invite code:
        </DialogContentText>
        <TextField
          autoFocus
          value={recipient}
          onChange={handleRecipientInput}
          margin="dense"
          id="email"
          label="Recipient Email"
          type="email"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSendInvite} color="primary">
          Invite
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default inviteToWorkspaceDialog;