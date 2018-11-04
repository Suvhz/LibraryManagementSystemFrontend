import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080/api/V1',
    timeout: 0,
    headers: {'Content-Type': 'application/json'}
});

export default instance;