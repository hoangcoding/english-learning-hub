import axios from "../config/initializers/axios";

const path = `/lesson`;

export const listByTopic = (topic) => {
    return axios.get(`${path}/list/byTopic/${topic}`).then(res => res);
};

export const getRandomWords = (amount) => {
    return axios.get(`${path}/list/random/${amount}`).then(res => res);
};