import { setJsonValue } from 'utilities';

export const addDevKeyToRequest = (devKey) => setJsonValue('api_dev_key')(devKey);

export const addUserKeyToRequest = (userKey) => setJsonValue('api_user_key')(userKey);

export const addUsernameToRequest = (username) => setJsonValue('api_user_name')(username);

export const addPasswordToRequest = (password) => setJsonValue('api_user_password')(password);

export const addResultLimitToRequest = (limit) => setJsonValue('api_results_limit')(limit);

export default { addDevKeyToRequest, addUsernameToRequest };
