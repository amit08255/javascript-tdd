import axios from 'axios';
import AxiosMockAdapter from 'utilities/http-interceptor';
import { getApiUserKey } from '.';

let mock = null;

beforeAll(() => {
    mock = new AxiosMockAdapter(axios);
});

describe('getApiUserKey test', () => {
    const API_URL = 'https://pastebin.com/api/api_login.php';

    test('is api request made', async () => {
        const mockedData = { x: 1 };
        mock.onPost(API_URL).reply(() => [200, mockedData]);

        const username = '1'; const password = '2'; const devKey = 'x';
        const response = await getApiUserKey({ username, password, devKey });

        expect(response.status).toBe(200);
        expect(response.data).toEqual(mockedData);
    });

    test('is api request converted to form-urlencoded', async () => {
        const mockedData = { x: 1 };
        mock.onPost(API_URL).reply(() => [200, mockedData]);

        const requestData = { username: 1, password: 'x', devKey: 'y' };
        const formEncodedRequest = 'api_user_name=1&api_user_password=x&api_dev_key=y';

        const response = await getApiUserKey(requestData);

        expect(response.config.data).toBe(formEncodedRequest);
    });
});

afterAll(() => {
    mock.restore();
});
