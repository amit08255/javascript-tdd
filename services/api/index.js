import {
    assoc, compose, concatString, map, join,
} from 'utilities';

import axios from 'axios';

/**
 * Starts API request
 * @param {{url:string, data:any, method:string, headers:any, params:any}} config
 * @returns {Promise}
 */

const startApiRequest = (config) => axios(config);

const addUrl = (url) => assoc('url')(url);

const addData = (data) => assoc('data')(data);

const addHeaders = (headers) => assoc('headers')(headers);

const addParams = (params) => assoc('params')(params);

const addMethod = (method) => assoc('method')(method);

const prepareApiConfig = ({
    url, data, method = 'POST', headers, params, config = {},
}) => compose(
    addMethod(method),
    addParams(params),
    addHeaders(headers),
    addData(data),
    addUrl(url),
)(config);

const processJsonForQuery = (json) => (key) => compose(
    concatString(encodeURIComponent(key)),
    concatString('='),
    concatString(encodeURIComponent(json[key])),
)('');

const convertJsonToQuery = (json) => compose(
    join('&'),
    map(processJsonForQuery(json)),
    Object.keys,
)(json);

const getPastbinApiConfig = (url) => (data) => (
    prepareApiConfig({
        url,
        data: convertJsonToQuery(data),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
);

export const extractApiResponseData = (response) => response.data;

export const addDevKeyToRequest = (devKey) => assoc('api_dev_key')(devKey);

export const addUserKeyToRequest = (userKey) => assoc('api_user_key')(userKey);

export const addUsernameToRequest = (username) => assoc('api_user_name')(username);

export const addPasswordToRequest = (password) => assoc('api_user_password')(password);

export const addResultLimitToRequest = (limit) => assoc('api_results_limit')(limit);

/**
 * Get user key from pastebin API
 * @param {{username:string, password:string, devKey:string}} param0
 */
export const getApiUserKey = ({ username, password, devKey }) => compose(
    startApiRequest,
    getPastbinApiConfig('https://pastebin.com/api/api_login.php'),
    addDevKeyToRequest(devKey),
    addPasswordToRequest(password),
    addUsernameToRequest(username),
)({});

export default { addDevKeyToRequest, addUsernameToRequest };
