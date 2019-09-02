import React, { Component } from 'react';

import {
    Alert,
    Form,
    Input,
    Button
} from 'antd';
import { styles } from '../_helpers';

import { restaurantService } from '../_services';

class EmployeePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            confirmDirty: false,
            error: false
        };
    }

    handleSubmit = event => {
        event.preventDefault();

        const { validateFields } = this.props.form;

        validateFields((errors, values) => {
            if (!errors) {
                let { employee } = values;
                employee = {...employee};
                this.handleRegister(employee);
            }
        });
    };

    handleRegister = employee => {
        let restaurantId = this.props.match.params.id;
        restaurantService
            .registerEmployee(restaurantId, employee)
            .then(() => {
                this.props.history.push(`/restaurants/${restaurantId}/employees`);
            })
            .catch(() => {
                this.setState({
                    error: 'Error while adding the employee.',
                    loading: false
                });
            });
    };

    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('employee.password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    render() {
        const { Item: FormItem } = Form;
        const { getFieldDecorator } = this.props.form;
        const { formItemLayout, buttonsLayout } = styles;
        const { id } = this.props.match.params;

        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                {
                    this.state.error &&
                    <Alert message={this.state.error} type='error' closable />
                }
                <FormItem label="Firstname">
                    {getFieldDecorator('employee.firstname', {
                        rules: [
                            {
                                required: true,
                                message: 'Firstname is required.'
                            }
                        ]
                    })(<Input />)}
                </FormItem>
                <FormItem label="Lastname">
                    {getFieldDecorator('employee.lastname', {
                        rules: [
                            {
                                required: true,
                                message: 'Lastname is required.'
                            }
                        ]
                    })(<Input />)}
                </FormItem>
                <FormItem label="Email">
                    {getFieldDecorator('employee.email', {
                        rules: [
                            {
                                type: 'email',
                                message: 'The email address is not valid!'
                            },
                            {
                                required: true,
                                message: 'Email address is required.'
                            }
                        ]
                    })(<Input />)}
                </FormItem>
                <FormItem label="Password" hasFeedback>
                    {getFieldDecorator('employee.password', {
                        rules: [
                            {
                                required: true,
                                message: 'Password is required.'
                            },
                            {
                                validator: this.validateToNextPassword
                            }
                        ]
                    })(<Input.Password />)}
                </FormItem>
                <FormItem label="Confirm Password" hasFeedback>
                    {getFieldDecorator('confirm', {
                        rules: [
                            {
                                required: true,
                                message: 'Please confirm the password.'
                            },
                            {
                                validator: this.compareToFirstPassword
                            }
                        ]
                    })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                </FormItem>

                <FormItem {...buttonsLayout}>
                    <Button type='primary' htmlType='submit' loading={this.state.loading}>
                        Add
                    </Button>

                    <Button
                        htmlType='button'
                        style={{ marginLeft: 15 }}
                        onClick={() => this.props.history.push(`/restaurants/${id}/employees`)}
                        loading={this.state.loading}
                    >
                        Cancel
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

export default Form.create({name: 'employee'})(EmployeePage);