import axios from 'axios';

import { authenticationService } from '../_services';

const setup = () => {
    axios.interceptors.request.use(config => {
        const currentUser = authenticationService.currentUserValue;

        if (currentUser && currentUser.token) {
            config.headers['Authorization'] = `Bearer ${currentUser.token}`;
        }

        return config;
    });
};

export const interceptors = {
    setup
};
