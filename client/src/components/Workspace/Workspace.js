import React, { Component } from 'react';
import { connect } from 'react-redux';

class Workspace extends Component {
    state = {
        mode: 'DAY_VIEW'
    }
    render() {
        return(
            <div>
                Hi from Workspace!
            </div>
        )
    }
}

export default connect()(Workspace);