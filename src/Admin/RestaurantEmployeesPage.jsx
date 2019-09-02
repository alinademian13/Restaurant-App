import React, { Component } from 'react';

import {
    Alert,
    Typography,
    Table,
    Button,
    Col,
    Row
} from 'antd';
import { restaurantService } from '../_services';

class RestaurantEmployeesPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            employees: [],
            error: ''
        };
    }

    componentDidMount() {
        this.setState({ loading: true });
        restaurantService.getAllEmployees(this.props.match.params.id).then(response => {
            this.setState({
                employees: response.data,
                loading: false
            });
        });
    }

    prepareColumns = () => {
        return [
            {
                title: 'Firstname',
                dataIndex: 'firstname',
                key: 'firstname'
            },
            {
                title: 'Lastname',
                dataIndex: 'lastname',
                key: 'lastname'
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email'
            }
        ];
    };

    render() {
        const { Title } = Typography;
        return (
            <div>
                <Row>
                    <Col span={8}>
                        <Title level={4}>Employees</Title>
                    </Col>

                    <Col span={8} offset={8}>
                        <Button
                            type='primary'
                            icon='plus'
                            style={{ float: 'right' }}
                            onClick={() => this.props.history.push('employees/new')}
                        >
                            Add
                        </Button>
                    </Col>
                </Row>

                {
                    this.state.error &&
                    <Alert message={this.state.error} type='error' closable />
                }

                <Table
                    rowKey={record => record.id}
                    columns={this.prepareColumns()}
                    dataSource={this.state.employees}
                    loading={this.state.loading}
                />
            </div>
        );
    }
}

export default RestaurantEmployeesPage;