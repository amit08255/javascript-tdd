const {
    addDevKeyToRequest, addUsernameToRequest, addPasswordToRequest,
    addUserKeyToRequest, addResultLimitToRequest, extractApiResponseData,
} = require('.');

describe('Add Dev Key to Request', () => {
    test('Should add dev key to json', () => {
        const devKey = '1234';
        const expectedJson = { api_dev_key: devKey };
        const json = {};
        const finalJson = addDevKeyToRequest(devKey)(json);
        expect(finalJson).toEqual(expectedJson);
    });

    test('Should add dev key to default json', () => {
        const devKey = '1234';
        const expectedJson = { api_dev_key: devKey };
        const finalJson = addDevKeyToRequest(devKey)();
        expect(finalJson).toEqual(expectedJson);
    });

    test('Should add dev key to default json when passed json is null', () => {
        const devKey = '1234';
        const expectedJson = { api_dev_key: devKey };
        const finalJson = addDevKeyToRequest(devKey)(null);
        expect(finalJson).toEqual(expectedJson);
    });

    test('Should add dev key to default json when passed json is undefined', () => {
        const devKey = '1234';
        const expectedJson = { api_dev_key: devKey };
        const finalJson = addDevKeyToRequest(devKey)(undefined);
        expect(finalJson).toEqual(expectedJson);
    });
});

describe('Add Password to Request', () => {
    test('Should add password to json', () => {
        const password = 'amit';
        const expectedJson = { api_user_password: password };
        const json = {};
        const finalJson = addPasswordToRequest(password)(json);
        expect(finalJson).toEqual(expectedJson);
    });

    test('Should add password to default json', () => {
        const password = 'amit';
        const expectedJson = { api_user_password: password };
        const finalJson = addPasswordToRequest(password)();
        expect(finalJson).toEqual(expectedJson);
    });

    test('Should add password to default json when passed json is null', () => {
        const password = 'amit';
        const expectedJson = { api_user_password: password };
        const finalJson = addPasswordToRequest(password)(null);
        expect(finalJson).toEqual(expectedJson);
    });

    test('Should add password to default json when passed json is undefined', () => {
        const password = 'amit';
        const expectedJson = { api_user_password: password };
        const finalJson = addPasswordToRequest(password)(undefined);
        expect(finalJson).toEqual(expectedJson);
    });
});

describe('Add Username to Request', () => {
    test('Should add username to json', () => {
        const username = 'amit';
        const expectedJson = { api_user_name: username };
        const json = {};
        const finalJson = addUsernameToRequest(username)(json);
        expect(finalJson).toEqual(expectedJson);
    });

    test('Should add username to default json', () => {
        const username = 'amit';
        const expectedJson = { api_user_name: username };
        const finalJson = addUsernameToRequest(username)();
        expect(finalJson).toEqual(expectedJson);
    });

    test('Should add username to default json when passed json is null', () => {
        const username = 'amit';
        const expectedJson = { api_user_name: username };
        const finalJson = addUsernameToRequest(username)();
        expect(finalJson).toEqual(expectedJson);
    });

    test('Should add username to default json when passed json is undefined', () => {
        const username = 'amit';
        const expectedJson = { api_user_name: username };
        const finalJson = addUsernameToRequest(username)(undefined);
        expect(finalJson).toEqual(expectedJson);
    });
});

describe('Add User Key to Request', () => {
    test('Should add user key to json', () => {
        const userKey = 'amit';
        const expectedJson = { api_user_key: userKey };
        const json = {};
        const finalJson = addUserKeyToRequest(userKey)(json);
        expect(finalJson).toEqual(expectedJson);
    });

    test('Should add user key to default json', () => {
        const userKey = 'amit';
        const expectedJson = { api_user_key: userKey };
        const finalJson = addUserKeyToRequest(userKey)();
        expect(finalJson).toEqual(expectedJson);
    });

    test('Should add user key to default json when passed json is null', () => {
        const userKey = 'amit';
        const expectedJson = { api_user_key: userKey };
        const finalJson = addUserKeyToRequest(userKey)();
        expect(finalJson).toEqual(expectedJson);
    });

    test('Should add user key to default json when passed json is undefined', () => {
        const userKey = 'amit';
        const expectedJson = { api_user_key: userKey };
        const finalJson = addUserKeyToRequest(userKey)(undefined);
        expect(finalJson).toEqual(expectedJson);
    });
});

describe('Add Result Limit to Request', () => {
    test('Should add result limit to json', () => {
        const limit = 100;
        const expectedJson = { api_results_limit: limit };
        const json = {};
        const finalJson = addResultLimitToRequest(limit)(json);
        expect(finalJson).toEqual(expectedJson);
    });

    test('Should add result limit to default json', () => {
        const limit = 100;
        const expectedJson = { api_results_limit: limit };
        const finalJson = addResultLimitToRequest(limit)();
        expect(finalJson).toEqual(expectedJson);
    });

    test('Should add result limit to default json when passed json is null', () => {
        const limit = 100;
        const expectedJson = { api_results_limit: limit };
        const finalJson = addResultLimitToRequest(limit)();
        expect(finalJson).toEqual(expectedJson);
    });

    test('Should add result limit to default json when passed json is undefined', () => {
        const limit = 100;
        const expectedJson = { api_results_limit: limit };
        const finalJson = addResultLimitToRequest(limit)(undefined);
        expect(finalJson).toEqual(expectedJson);
    });
});

describe('extractApiResponseData test', () => {
    test('Should return API response data', () => {
        const response = { data: 'fa24fa7555bc7ecf3185ea747c5e0d6d' };
        const data = extractApiResponseData(response);
        expect(data).toBe(response.data);
    });

    test('Should throw error when response not valid JSON', () => {
        const response = null;
        expect(() => extractApiResponseData(response)).toThrow(Error);
    });
});
