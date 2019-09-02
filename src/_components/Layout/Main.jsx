import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import { PrivateRoute } from '../PrivateRoute';
import LoginPage from '../../Anonymous/LoginPage';
import LogoutPage from '../../Authenticated/LogoutPage';
import MapPage from '../../Anonymous/MapPage';
import { default as AdminRestaurantsPage } from '../../Admin/RestaurantsPage';
import { default as AdminRestaurantPage } from '../../Admin/RestaurantPage';
import { default as RestaurantEmployeesPage } from '../../Admin/RestaurantEmployeesPage.jsx';
import { default as EmployeePage } from '../../Admin/EmployeePage';

import { Role } from '../../_constants';

// import Dashboard from '../Dashboard/Dashboard';
// import { default as RestaurantsTable } from '../Restaurant/Table';
// import { default as RestaurantForm } from '../Restaurant/Form';

class Main extends Component {
    render() {
        return (
            <Switch>
                {/* admin */}
                <PrivateRoute path='/restaurants' exact component={AdminRestaurantsPage} roles={[Role.ADMIN]} />
                <PrivateRoute path='/restaurants/new' exact component={AdminRestaurantPage} roles={[Role.ADMIN]} isEdit={false} />
                <PrivateRoute path='/restaurants/:id/edit' exact component={AdminRestaurantPage} roles={[Role.ADMIN]} isEdit={true} />
                <PrivateRoute path='/restaurants/:id/employees' exact component={RestaurantEmployeesPage} roles={[Role.ADMIN]} isEdit={false} />
                <PrivateRoute path='/restaurants/:id/employees/new' exact component={EmployeePage} roles={[Role.ADMIN]} isEdit={false} />

                {/* map */}
                <Route path='/' exact component={MapPage} />

                {/* logout */}
                <Route path='/logout' exact component={LogoutPage} roles={[Role.REGULAR, Role.EMPLOYEE, Role.ADMIN]} />

                {/* login */}
                <Route path='/login' component={LoginPage} />
            </Switch>
        );
    }
}

export default Main;
