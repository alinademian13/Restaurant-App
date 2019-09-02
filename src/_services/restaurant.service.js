import axios from 'axios';
import { BaseApiUrl } from '../_constants';

const getAll = page => {
    return axios.get(`${BaseApiUrl}/restaurants`, { params: { page } });
};

const find = id => {
    return axios.get(`${BaseApiUrl}/restaurants/${id}`);
};

const create = restaurant => {
    return axios.post(`${BaseApiUrl}/restaurants`, restaurant);
};

const edit = (id, restaurant) => {
    return axios.put(`${BaseApiUrl}/restaurants/${id}`, restaurant);
};

const changeStatus = id => {
    return axios.put(`${BaseApiUrl}/restaurants/${id}/change-status`);
};

const getAllEmployees = id => {
    return axios.get(`${BaseApiUrl}/restaurants/${id}/employees`);
};

const registerEmployee = (id, employee) => {
    return axios.post(`${BaseApiUrl}/restaurants/${id}/new-employee`, employee);
};

export const restaurantService = {
    getAll,
    find,
    create,
    edit,
    changeStatus,
    getAllEmployees,
    registerEmployee
};