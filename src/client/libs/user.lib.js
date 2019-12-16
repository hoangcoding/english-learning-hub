import axios from "../config/initializers/axios";

const path = `/user`;

export const auth = (payload, type) => {
        return axios.post(`${path}/${type}`, {...payload, clientType: 'browser'}).then(res => res);
};

export const logout = (payload) => {
    return axios.put(`${path}/logout`, payload).then(res => res);
};

export const getProgress = (payload, topic = '') => {
    let url = `${path}/getProgress`;
    if(topic && topic !== '') url += `?topic=${topic}`;
    return axios.get(url).then(res => res);
};

export const addWord = (payload) => {
    return axios.post(`${path}/addWord`, payload).then(res => res);
};