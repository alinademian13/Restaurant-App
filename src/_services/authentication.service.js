import { BehaviorSubject } from 'rxjs';
import axios from 'axios';
import { BaseApiUrl } from '../_constants';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

const login = (email, password) => {
    return axios
        .post(`${BaseApiUrl}/users/authenticate`, { email, password })
        .then(
            response => {
                const user = response.data;

                localStorage.setItem('currentUser', JSON.stringify(user));

                currentUserSubject.next(user);

                return user;
            },
            () => {
                return Promise.reject();
            }
        );
};

const logout = () => {
    localStorage.removeItem('currentUser');

    currentUserSubject.next(null);
};

export const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value; }
};
