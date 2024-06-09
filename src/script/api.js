import axios from 'axios';

const root_api = process.env.REACT_APP_ROOT_URL;

async function signup(formData, test_id) {
    try {
        const response = await axios.post(`${root_api}/auth/signup?test_id=${test_id}`, formData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
}

async function login(formData) {
    try {
        const response = await axios.post(`${root_api}/auth/login`, formData)
        const token = response.headers.get('auth');
        window.localStorage.setItem('token', token);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
}

async function submitResponse(score, response) {
    try {
        const respons = await axios.post(`${root_api}submit-response`, {score, response}, {
            headers: {
                'auth': window.localStorage.getItem('token')
            }
        })
        return respons.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
}

async function suspend() {
    try {
        const response = await axios.get(`${root_api}suspend`, {
            headers: {
                'auth': window.localStorage.getItem('token')
            }
        })
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
}

export { signup, login, submitResponse, suspend };