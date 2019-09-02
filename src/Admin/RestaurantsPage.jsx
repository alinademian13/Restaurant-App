import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {
    Alert,
    Typography,
    Table,
    Button,
    Icon,
    Divider,
    Tooltip,
    Col,
    Row
} from 'antd';

import { restaurantService } from '../_services';
import { DEFAULT_NUM_PER_PAGE } from '../_constants';

class RestaurantsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            restaurants: [],
            error: '',
            pagination: {
                page: 1,
                total: 0,
                pageSize: DEFAULT_NUM_PER_PAGE
            }
        };
    }

    loadRestaurants = () => {
        this.setState({ loading: true });

        restaurantService.getAll(this.state.pagination.page).then(response => {
            const { data } = response;

            this.setState({
                loading: false,
                restaurants: data.entries,
                pagination: {
                    page: data.currentPage,
                    total: data.numberOfEntries
                }
            });
        });
    };

    componentDidMount() {
        this.loadRestaurants();
    }

    handleStatusChanged = restaurant => {
        this.setState({ loading: true });

        restaurantService
            .changeStatus(restaurant.id)
            .then(response => {
                const { data } = response;

                const index = this.state.restaurants.map(item => {
                    return item.id;
                }).indexOf(restaurant.id);

                if (index === -1) {
                    return;
                }

                const { restaurants } = this.state;

                restaurants[index] = data;

                this.setState({ restaurants });
            })
            .catch(() => {
                this.setState({ error: 'Error while changing the status.'});
            })
            .finally(() => {
                this.setState({ loading: false });
            });
    };

    handlePaginationChanged = page => {
        this.setState({
            pagination: {
                ...this.state.pagination,
                page
            }
        }, () => {
            this.loadRestaurants();
        });
    };

    prepareColumns = () => {
        return [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: 'Active',
                dataIndex: 'isActive',
                key: 'isActive',
                render: isActive => (
                    isActive
                        ? <Icon type='check-circle' theme='twoTone' twoToneColor='#00cc00' />
                        : <Icon type='close-circle' theme='twoTone' twoToneColor='#ff0000' />
                )
            },
            {
                title: 'Actions',
                key: 'actions',
                render: (text, record) => {
                    return this.renderActions(record);
                }
            }
        ];
    };

    renderActions = restaurant => (
        <span>
            <Tooltip title='Edit'>
                <Link to={`restaurants/${restaurant.id}/edit`}>
                    <Icon type='edit' />
                </Link>
            </Tooltip>

            <Divider type='vertical' />

            {
                restaurant.isActive &&
                <Tooltip title='Deactivate'>
                    <Icon type='close-circle' onClick={() => this.handleStatusChanged(restaurant)} />
                </Tooltip>
            }

            {
                !restaurant.isActive &&
                <Tooltip title='Activate'>
                    <Icon type='check-circle' onClick={() => this.handleStatusChanged(restaurant)} />
                </Tooltip>
            }

            <Divider type='vertical' />

            <Tooltip title='Employees'>
                <Link to={`restaurants/${restaurant.id}/employees`}>
                    <Icon type='user' />
                </Link>
            </Tooltip>
        </span>
    );

    render() {
        const { Title } = Typography;

        const pagination = {
            ...this.state.pagination,
            onChange: this.handlePaginationChanged
        };

        return (
            <div>
                <Row>
                    <Col span={8}>
                        <Title level={4}>Restaurants</Title>
                    </Col>

                    <Col span={8} offset={8}>
                        <Button
                            type='primary'
                            icon='plus'
                            style={{ float: 'right' }}
                            onClick={() => this.props.history.push('/restaurants/new')}
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
                    dataSource={this.state.restaurants}
                    loading={this.state.loading}
                    pagination={pagination}
                />
            </div>
        );
    }
}

export default RestaurantsPage;
