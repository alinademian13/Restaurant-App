import React from 'react';
import PropTypes from 'prop-types';

import { GoogleMap, Marker, withGoogleMap } from 'react-google-maps';

import { map } from '../../_constants';

const Map = withGoogleMap(({ markers, onMarkerClicked }) =>
    <GoogleMap
        defaultZoom={map.DEFAULT_ZOOM}
        defaultCenter={{ lat: map.DEFAULT_LAT, lng: map.DEFAULT_LNG }}
    >
        {
            markers.map((marker, index) => {
                const { id, lat, lng } = marker;

                return <Marker position={{ lat, lng }} key={index} onClick={() => onMarkerClicked(id)} />;
            })
        }
    </GoogleMap>
);

Map.propTypes = {
    markers: PropTypes.array.isRequired,
    onMarkerClicked: PropTypes.func.isRequired
};

Map.defaultProps = {
    markers: []
};

export default Map;
