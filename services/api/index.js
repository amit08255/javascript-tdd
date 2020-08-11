import { assoc } from 'utilities';

export const addDevKeyToRequest = (devKey) => assoc('api_dev_key')(devKey);

export const addUserKeyToRequest = (userKey) => assoc('api_user_key')(userKey);

export const addUsernameToRequest = (username) => assoc('api_user_name')(username);

export const addPasswordToRequest = (password) => assoc('api_user_password')(password);

export const addResultLimitToRequest = (limit) => assoc('api_results_limit')(limit);

export default { addDevKeyToRequest, addUsernameToRequest };
