import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const switchWorkspaceDialog = (props) => {
  const {
    workspaces,
    handleClose,
    open,
    handleSwitchWorkspace,
  } = props;
  const workspaceList = workspaces.map(workspace => (
    <ListItem
      button
      key={`workspace-${workspace.id}`}
      onClick={() => handleSwitchWorkspace(workspace.id)}
    >
      <ListItemText primary={workspace.name} />
    </ListItem>
  ));
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle id="switch-workspace-dialog-title">
        Select Workspace
      </DialogTitle>
      <div>
        <List>
          {workspaceList}
          <ListItem button onClick={handleClose}>
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Create New Workspace" />
          </ListItem>
        </List>
      </div>
    </Dialog>
  );
};

const mapStateToProps = state => ({
  workspaces: state.auth.user ? state.auth.user.workspace_set : [],
});

switchWorkspaceDialog.propTypes = {
  workspaces: PropTypes.array.isRequired, // eslint-disable-line
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSwitchWorkspace: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(switchWorkspaceDialog);
