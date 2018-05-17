import React, { Component } from 'react';
import { connect } from 'react-redux';

class ProjectManager extends Component {

    render() {
        return <div>Hi from Project Manager!</div>;
    }
}

export default connect()(ProjectManager);