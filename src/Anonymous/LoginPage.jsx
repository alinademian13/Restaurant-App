import React, { Component } from 'react';

import { Alert, Form, Input, Icon, Button, Row } from 'antd';

import { authenticationService } from '../_services';

class LoginPage extends Component {
    constructor(props) {
        super(props);

        if (authenticationService.currentUserValue) {
            this.props.history.push('/');
        }

        this.state = {
            loading: false,
            error: ''
        };
    }

    handleSubmit = event => {
        event.preventDefault();

        const { validateFields } = this.props.form;

        validateFields((errors, values) => {
            if (!errors) {
                this.setState({ loading: true });

                const { email, password } = values;

                authenticationService
                    .login(email, password)
                    .then(
                        () => {
                            const { from } = this.props.location.state || { from: { pathname: '/' } };

                            this.props.history.push(from);
                        },
                        () => {
                            this.setState({
                                loading: false,
                                error: 'Invalid email or password.'
                            });
                        }
                    );
            }
        });
    };

    render() {
        const { Item: FormItem } = Form;
        const { getFieldDecorator } = this.props.form;

        return (
            <Row type='flex' justify='center' align='middle'>
                <Form onSubmit={this.handleSubmit}>
                    {
                        this.state.error &&
                        <Alert message={this.state.error} type='error' closable />
                    }

                    <FormItem style={{ marginBottom: 0 }}>
                        {getFieldDecorator('email', {
                            rules: [
                                { required: true, message: 'Email is required.' },
                                { email: true, message: 'Invalid email address.' }
                            ]
                        })(
                            <Input
                                type='email'
                                prefix={<Icon type='user' style={{ color: 'rgba(0, 0, 0, .25)' }}/>}
                                placeholder='Email'
                            />
                        )}
                    </FormItem>

                    <FormItem style={{ marginBottom: 0 }}>
                        {getFieldDecorator('password', {
                            rules: [
                                { required: true, message: 'Password is required.' }
                            ]
                        })(
                            <Input
                                type='password'
                                prefix={<Icon type='lock' style={{ color: 'rgba(0, 0, 0, .25)' }}/>}
                                placeholder='Password'
                            />
                        )}
                    </FormItem>

                    <FormItem style={{ textAlign: 'center' }}>
                        <Button type='primary' htmlType='submit' loading={this.state.loading}>
                            Login
                        </Button>
                    </FormItem>
                </Form>
            </Row>
        );
    }
}

export default Form.create({
    name: 'login'
})(LoginPage);
