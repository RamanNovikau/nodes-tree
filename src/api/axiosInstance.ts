import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://test.vmarmysh.com/',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default axiosInstance;

