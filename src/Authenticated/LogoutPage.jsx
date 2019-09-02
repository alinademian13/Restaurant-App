import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { authenticationService } from '../_services';

class LogoutPage extends Component {
    constructor(props) {
        super(props);

        authenticationService.logout();
    }

    render() {
        return <Redirect to='/login' />;
    }
}

export default LogoutPage;
