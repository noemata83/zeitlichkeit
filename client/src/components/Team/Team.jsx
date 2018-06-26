import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import {
    List,
    ListItem,
    ListItemText,
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
    DialogTitle } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import InviteToWorkspaceDialog from '../UI/Dialogs/inviteToWorkspace';

const styles = {
  title: {
    fontSize: '3rem',
    // padding: '2rem',
  },
};

class Team extends Component {
  state = {
    inviteDialogOpen: false,
    sentAlertOpen: false,
    recipient: '',
    error: null,
  }

  handleOpen = () => this.setState({ inviteDialogOpen: true });

  handleClose = () => this.setState({ inviteDialogOpen: false });

  handleAlert = () => this.setState({ sendAlertOpen: true });
  handleAlertClose = () => this.setState({ sentAlertOpen: false });

  handleRecipientInput = event => this.setState({ recipient: event.target.value });

  handleSendInvite = () => {
    const email = this.state.recipient; 
    const { workspace, token } = this.props;
    // console.log(`Let's send an invite to ${this.state.recipient}`);
    this.setState({ inviteDialogOpen: false });
    const headers = {
        'Content-type': 'application/json',
        'Authorization': `Token ${token}`,
      };
    
    axios.post('/api/workspaces/invite', { email, workspace }, { headers }).then(() => { 
      this.setState({ error: null, sentAlertOpen: true });
      this.handleAlert();
    }).catch(error => { 
      this.setState({ error });
      this.handleAlert();
    });
  }

  render() {
  const { users, classes } = this.props;
  return (
    <div style={{ padding: '2rem' }}>
      <h1 className={classes.title}>Your Team</h1>
      <List>
        {users.map(user => (
          <ListItem key={user.id}>
            <ListItemText primary={user.username} />
          </ListItem>
        ))}
      </List>
      <Button
        variant="raised"
        onClick={this.handleOpen}
        color="secondary">
        Invite a New User
      </Button>
      <InviteToWorkspaceDialog
        open={this.state.inviteDialogOpen}
        recipient={this.state.recipient}
        handleClose={this.handleClose}
        handleSendInvite={this.handleSendInvite}
        handleRecipientInput={this.handleRecipientInput}
      />
      <Dialog
        open={this.state.sentAlertOpen}
        onClose={this.handleAlertClose}
        aria-labeledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{this.state.error ? "Error" : "Invite Code Sent"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            { this.state.error ? "We're sorry. We could not send an invite code at this time." : "Your invitation is on its way."}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={this.handleAlertClose} color="primary">OK</Button>
        </DialogActions>
      </Dialog>
    </div>
    );
  }
}

Team.propTypes = {
  users: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  users: state.workspace.users,
  workspace: state.workspace.id,
  token: state.auth.token,
});

export default connect(mapStateToProps)(withStyles(styles)(Team));
