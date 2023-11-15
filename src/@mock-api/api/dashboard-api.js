import axios from 'axios';
import mock from '../mock';
import mockApi from "../data/plant-data.json";

let powerPlants = mockApi.powerPlants;

/* eslint-disable camelcase */
mock.onGet('api/user/dashboard/findAll').reply((config) => {
    let numOfPlants = config.data || powerPlants.length;
    return [200, powerPlants.slice(0, numOfPlants)];
});

mock.onGet('api/user/dashboard/findPlantsByIds').reply((config) => {
    const ids = (JSON.parse(config.data)).ids.map(id => parseInt(id));
    const filteredProducts = powerPlants.filter(product => ids.includes(product.id));
    return [200, filteredProducts];
});

