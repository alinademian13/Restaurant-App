import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { Alert, Form, Input, TimePicker, Button } from 'antd';
import Autocomplete from 'react-google-autocomplete';

import { date, styles } from '../_helpers';
import { restaurantService } from '../_services';

class RestaurantPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: this.props.isEdit,
            error: false
        };
    }

    handlePlaceSelected = place => {
        const { location } = place.geometry;
        const { setFieldsValue } = this.props.form;

        setFieldsValue({
            'restaurant.latitude': location.lat(),
            'restaurant.longitude': location.lng()
        });
    };

    componentDidMount() {
        if (this.props.isEdit) {
            const { setFieldsValue } = this.props.form;

            restaurantService
                .find(this.props.match.params.id)
                .then(response => {
                    const restaurant = response.data;

                    setFieldsValue({
                        'restaurant.name': restaurant.name,
                        'restaurant.latitude': restaurant.latitude,
                        'restaurant.longitude': restaurant.longitude,
                        'restaurant.openingTime': moment(restaurant.openingTime, date.TIME_FORMAT),
                        'restaurant.closingTime': moment(restaurant.closingTime, date.TIME_FORMAT)
                    });

                    this.setState({ loading: false });
                })
                .catch(() => {
                    this.props.history.push('/restaurants');
                });
        }
    }

    handleSubmit = event => {
        event.preventDefault();

        const { validateFields } = this.props.form;

        validateFields((errors, values) => {
            if (!errors) {
                this.setState({ loading: true });

                let { restaurant } = values;

                restaurant = {
                    ...restaurant,
                    openingTime: restaurant.openingTime.format(date.TIME_FORMAT),
                    closingTime: restaurant.closingTime.format(date.TIME_FORMAT)
                };

                this.props.isEdit ? this.handleEdit(restaurant) : this.handleCreate(restaurant);
            }
        });
    };

    handleCreate = restaurant => {
        restaurantService
            .create(restaurant)
            .then(() => {
                this.props.history.push('/restaurants');
            })
            .catch(() => {
                this.setState({
                    error: 'Error while creating the restaurant.',
                    loading: false
                });
            });
    };

    handleEdit = restaurant => {
        restaurantService
            .edit(this.props.match.params.id, restaurant)
            .then(() => {
                this.props.history.push('/restaurants');
            })
            .catch(() => {
                this.setState({
                    error: 'Error while updating the restaurant.',
                    loading: false
                });
            });
    };

    render() {
        const { Item: FormItem } = Form;
        const { getFieldDecorator } = this.props.form;
        const { formItemLayout, buttonsLayout } = styles;

        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                {
                    this.state.error &&
                    <Alert message={this.state.error} type='error' closable />
                }

                <FormItem label='Name'>
                    {getFieldDecorator('restaurant.name', {
                        rules: [
                            { required: true, message: 'Restaurant name is required.' }
                        ]
                    })(<Input placeholder='Name' disabled={this.state.loading} />)}
                </FormItem>

                <FormItem label='Location'>
                    <Autocomplete
                        onPlaceSelected={this.handlePlaceSelected}
                        types={['address']}
                        componentRestrictions={{ country: 'ro' }}
                    />
                </FormItem>

                <FormItem label='Latitude'>
                    {getFieldDecorator('restaurant.latitude', {
                        rules: [
                            { required: true, message: 'Latitude is required.' }
                        ]
                    })(<Input placeholder='Latitude' disabled={true} />)}
                </FormItem>

                <FormItem label='Longitude'>
                    {getFieldDecorator('restaurant.longitude', {
                        rules: [
                            { required: true, message: 'Longitude is required.' }
                        ]
                    })(<Input placeholder='Longitude' disabled={true} />)}
                </FormItem>

                <FormItem label='Opening Time'>
                    {getFieldDecorator('restaurant.openingTime', {
                        rules: [
                            { required: true, message: 'Opening time is required.' }
                        ]
                    })(
                        <TimePicker placeholder='Opening Time' format={date.TIME_FORMAT} disabled={this.state.loading} />
                    )}
                </FormItem>

                <FormItem label='Closing Time'>
                    {getFieldDecorator('restaurant.closingTime', {
                        rules: [
                            { required: true, message: 'Closing time is required.' }
                        ]
                    })(
                        <TimePicker placeholder='Closing Time' format={date.TIME_FORMAT} disabled={this.state.loading} />
                    )}
                </FormItem>

                <FormItem {...buttonsLayout}>
                    <Button type='primary' htmlType='submit' loading={this.state.loading}>
                        Save
                    </Button>

                    <Button
                        htmlType='button'
                        style={{ marginLeft: 15 }}
                        onClick={() => this.props.history.push('/restaurants')}
                        loading={this.state.loading}
                    >
                        Cancel
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

RestaurantPage.propTypes = {
    isEdit: PropTypes.bool.isRequired
};

export default Form.create({
    name: 'restaurant'
})(RestaurantPage);
