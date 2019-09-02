import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

import { Layout, Menu } from 'antd';

import { Role } from '../../_constants';

const Header = withRouter(({ location, currentUser }) => {
    const { Header: AntHeader } = Layout;
    const { Item: MenuItem } = Menu;

    const getMenuItems = () => {
        let menuItems = [
            { path: '/', text: 'Map' }
        ];

        if (!currentUser) {
            menuItems.push({ path: '/login', text: 'Login' });

            return menuItems;
        }

        switch (currentUser.userRole) {
            case Role.ADMIN:
                menuItems.push({ path: '/restaurants', text: 'Restaurants' });
                break;

            case Role.EMPLOYEE:
                menuItems.push(
                    { path: '/restaurant', text: 'Restaurant' },
                    { path: '/categories', text: 'Categories' }
                );
                break;

            case Role.REGULAR:
            default:
                break;
        }

        menuItems.push({ path: '/logout', text: 'Logout' });

        return menuItems;
    };

    const getSelectedKeys = () => {
        const parts = location.pathname.replace(/^\//, '').split('/');

        return [
            '/' + parts[0]
        ];
    };

    return (
        <AntHeader>
            <Menu
                theme='dark'
                mode='horizontal'
                style={{ lineHeight: '64px' }}
                selectedKeys={getSelectedKeys()}
            >
                {getMenuItems().map(item => (
                    <MenuItem key={item.path}>
                        <Link to={item.path}>{item.text}</Link>
                    </MenuItem>
                ))}
            </Menu>
        </AntHeader>
    );
});

Header.propTypes = {
    currentUser: PropTypes.object
};

Header.defaultProps = {
    currentUser: null
};

export default Header;
