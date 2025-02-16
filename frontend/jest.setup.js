const fetchMock = require('jest-fetch-mock');

global.localStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
};

fetchMock.enableMocks();
