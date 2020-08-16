import axios from 'axios';
import AxiosMockAdapter from 'utilities/http-interceptor';
import { getUserPasteList } from 'services/api';

let mock = null;

beforeAll(() => {
    mock = new AxiosMockAdapter(axios);
});

describe('getUserPasteList test', () => {
    const API_URL = 'https://pastebin.com/api/api_post.php';

    test('should return promise', () => {
        const mockedData = { x: 1 };
        mock.onPost(API_URL).reply(() => [200, mockedData]);
        const userKey = 'x'; const devKey = 'y'; const resultLimit = 'z';
        const promise = getUserPasteList({ userKey, devKey, resultLimit });
        expect(promise instanceof Promise).toBeTruthy();
    });

    test('is api request made', async () => {
        const mockedData = { x: 1 };
        mock.onPost(API_URL).reply(() => [200, mockedData]);
        const userKey = 'x'; const devKey = 'y'; const resultLimit = 'z';
        const response = await getUserPasteList({ userKey, devKey, resultLimit });
        expect(response.status).toBe(200);
        expect(response.data).toEqual(mockedData);
    });

    test('is api request converted to form-urlencoded', async () => {
        const mockedData = { x: 1 };
        mock.onPost(API_URL).reply(() => [200, mockedData]);
        const userKey = 'x'; const devKey = 'y'; const resultLimit = 'z';
        const formEncodedRequest = 'api_user_key=x&api_dev_key=y&api_results_limit=z';
        const response = await getUserPasteList({ userKey, devKey, resultLimit });
        expect(response.config.data).toBe(formEncodedRequest);
    });
});

afterAll(() => {
    mock.restore();
});
