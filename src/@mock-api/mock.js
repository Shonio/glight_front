import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.glight.kz/',
});

instance.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

const mock = new MockAdapter(axios, { delayResponse: 500, onNoMatch: 'passthrough' });

export { instance as axiosInstance };
export default mock;
