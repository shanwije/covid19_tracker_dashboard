import axios from 'axios';
import wrapper from 'axios-cache-plugin';

const baseUrl = 'http://localhost:8080/api/v1/dashboard/LKA/';

const http = wrapper(axios, {
    maxCacheSize: 15,
    ttl: 5000, // time to live. if you set this option the cached item will be auto deleted after ttl(ms).
});
// eslint-disable-next-line no-underscore-dangle
http.__addFilter(/LKA/);

// eslint-disable-next-line import/prefer-default-export
export const getDeathsPerDateGraphData = async () => {
    return http({
        url: `${baseUrl}deathsPerDate`,
        method: 'get',
        params: {},
    });
};

export const getPatientsPerDateGraphData = async () => {
    return http({
        url: `${baseUrl}patientsPerDate`,
        method: 'get',
        params: {},
    });
};
