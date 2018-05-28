import React from 'react';
import { connect } from 'react-redux';
import { Dialog, DialogTitle, List, ListItem,ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

// import * as R from 'ramda';

const switchWorkspaceDialog = props => {
    const { workspaces, handleClose, open, handleSwitchWorkspace } = props;
    const workspaceList = workspaces.map(workspace => (
        <ListItem button key={`workspace-${workspace.id}`} onClick={() => handleSwitchWorkspace(workspace.id)}>
            <ListItemText primary={workspace.name}/>
        </ListItem>
    ));
    return (
    <Dialog onClose={handleClose} open={open}>
        <DialogTitle id="switch-workspace-dialog-title">Select Workspace</DialogTitle>
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
}

const mapStateToProps = state => {
    return {
        workspaces: state.auth.user ? state.auth.user.workspace_set : []
    }
}

export default connect(mapStateToProps)(switchWorkspaceDialog);