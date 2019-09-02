import React, { Component } from 'react';

import { Layout } from 'antd';

import Header from '../_components/Layout/Header';
import Main from '../_components/Layout/Main';

import { authenticationService } from '../_services';
import { history } from '../_helpers';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null
        };
    }

    componentDidMount() {
        authenticationService.currentUser.subscribe(currentUser => this.setState({ currentUser }));
    }

    logout = () => {
        authenticationService.logout();

        history.push('/login');
    };

    render() {
        const { currentUser } = this.state;

        const { Content } = Layout;

        return (
            <Layout>
                <Header currentUser={currentUser} />

                <Content style={{ padding: '24px 48px' }}>
                    <Layout style={{ padding: '24px 0', background: '#fff', minHeight: 'calc(100vh - 120px)' }}>
                        <Content style={{ padding: '0 24px' }}>
                            <Main />
                        </Content>
                    </Layout>
                </Content>
            </Layout>
        );
    }
}

export default App;
