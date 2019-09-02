import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { authenticationService } from '../_services';

export const PrivateRoute = ({ component: Component, roles, ...rest }) => (
    <Route {...rest} render={props => {
        const currentUser = authenticationService.currentUserValue;

        if (!currentUser) {
            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
        }

        if (roles && roles.indexOf(currentUser.userRole) === -1) {
            return <Redirect to={{ pathname: '/' }} />;
        }

        return <Component {...props} {...rest} />;
    }} />
);
