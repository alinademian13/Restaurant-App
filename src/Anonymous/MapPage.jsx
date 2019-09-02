import React, { Component } from 'react';

import { Progress } from 'antd';

import Map from '../_components/Map/Map';

import { restaurantService } from '../_services';

class MapPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            restaurants: [],
            loading: true
        };
    }

    componentDidMount() {
        restaurantService
            .getAll()
            .then(response => {
                this.setState({ restaurants: response.data.entries });
            })
            .finally(() => {
                this.setState({ loading: false });
            });
    }

    handleMarkerClicked = id => {
        console.log(id);
    };

    render() {
        if (this.state.loading) {
            return <Progress percent={100} showInfo={false} status='active' />;
        }

        const markers = this.state.restaurants.map(restaurant => {
            return {
                id: restaurant.id,
                lat: parseFloat(restaurant.latitude),
                lng: parseFloat(restaurant.longitude)
            };
        });

        return (
            <Map
                containerElement={<div style={{ height: '500px', width: '80%', margin: '0 auto' }} />}
                mapElement={<div style={{ height: '100%' }} />}
                markers={markers}
                onMarkerClicked={this.handleMarkerClicked}
            />
        );
    }
}

export default MapPage;
