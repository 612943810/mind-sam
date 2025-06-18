"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
jest.mock('../models/InventoryModel', () => ({
    inventory: {
        save: jest.fn(),
        find: jest.fn(),
        findByIdAndUpdate: jest.fn(),
        findByIdAndDelete: jest.fn(),
    }
}));
describe('postInventory', () => {
    let req;
    let res;
    beforeEach(() => {
        req = { body: { /* your request body */} };
        res = { send: jest.fn(), json: jest.fn() };
    });
    it('should save inventory data ', async () => {
    });
    it('should handle errors by sending JSON response', async () => {
    });
});
