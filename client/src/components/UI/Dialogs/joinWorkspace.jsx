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

const joinWorkspaceDialog = (props) => {
  const {
    handleClose,
    open,
    handleJoinWorkspace,
    handleInviteCodeInput,
    inviteCode,
  } = props;
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle id="join-workspace-dialog-title">
        Join a Workspace
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
            Enter a valid invite code to join a workspace:
        </DialogContentText>
        <TextField
          autoFocus
          value={inviteCode}
          onChange={handleInviteCodeInput}
          margin="dense"
          id="code"
          label="Invite Code"
          type="text"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleJoinWorkspace} color="primary">
          Join
        </Button>
      </DialogActions>
    </Dialog>
  );
};

joinWorkspaceDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleJoinWorkspace: PropTypes.func.isRequired,
  handleInviteCodeInput: PropTypes.func.isRequired,
  inviteCode: PropTypes.string.isRequired,
};

export default joinWorkspaceDialog;
