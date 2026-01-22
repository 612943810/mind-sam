"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const controller = __importStar(require("../controller/InventoryController"));
jest.mock('../models/InventoryModel', () => {
    const inventory = jest.fn();
    inventory.find = jest.fn();
    inventory.findByIdAndUpdate = jest.fn();
    inventory.findByIdAndDelete = jest.fn();
    return { inventory };
});
const { inventory } = require('../models/InventoryModel');
describe('InventoryController (ts)', () => {
    beforeEach(() => jest.clearAllMocks());
    describe('postInventory', () => {
        it('sends Success when save resolves', async () => {
            const req = { body: { inventoryName: 'item', inventoryDate: '2020-01-01' } };
            const res = { send: jest.fn(), json: jest.fn() };
            inventory.mockImplementation(() => ({ save: jest.fn().mockResolvedValue(undefined) }));
            await controller.postInventory(req, res);
            expect(res.send).toHaveBeenCalledWith('Success');
        });
        it('returns error JSON when save rejects', async () => {
            const req = { body: { inventoryName: 'item' } };
            const res = { send: jest.fn(), json: jest.fn() };
            const error = new Error('db failure');
            inventory.mockImplementation(() => ({ save: jest.fn().mockRejectedValue(error) }));
            await controller.postInventory(req, res);
            expect(res.json).toHaveBeenCalledWith(error);
        });
    });
    describe('getInventory', () => {
        it('returns all inventory when no query provided', async () => {
            const req = { query: {} };
            const sample = [{ inventoryName: 'a' }];
            inventory.find.mockResolvedValue(sample);
            const res = { send: jest.fn(), json: jest.fn() };
            await controller.getInventory(req, res);
            expect(inventory.find).toHaveBeenCalledWith({});
            expect(res.send).toHaveBeenCalledWith(sample);
        });
        it('queries by inventoryId when inid present', async () => {
            const req = { query: { inid: '123' } };
            const sample = [{ inventoryId: 123 }];
            inventory.find.mockResolvedValue(sample);
            const res = { send: jest.fn(), json: jest.fn() };
            await controller.getInventory(req, res);
            expect(inventory.find).toHaveBeenCalledWith({ inventoryId: req.query.inid });
            expect(res.send).toHaveBeenCalledWith(sample);
        });
    });
    describe('updateInventory', () => {
        it('responds with Inventory Updated on success', async () => {
            const req = { params: { id: 'abc' }, body: { inventoryName: 'updated' } };
            inventory.findByIdAndUpdate.mockResolvedValue({});
            const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
            await controller.updateInventory(req, res);
            expect(inventory.findByIdAndUpdate).toHaveBeenCalledWith(req.params.id, req.body, expect.any(Object));
            expect(res.json).toHaveBeenCalledWith('Inventory Updated');
        });
        it('returns 500 json on error', async () => {
            const req = { params: { id: 'abc' }, body: {} };
            const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
            const error = new Error('update failed');
            inventory.findByIdAndUpdate.mockRejectedValue(error);
            await controller.updateInventory(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith(error);
        });
    });
    describe('deleteInventory', () => {
        it('responds with Inventory deleted on success', async () => {
            const req = { params: { id: 'xyz' } };
            inventory.findByIdAndDelete.mockResolvedValue({});
            const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
            await controller.deleteInventory(req, res);
            expect(inventory.findByIdAndDelete).toHaveBeenCalledWith(req.params.id);
            expect(res.json).toHaveBeenCalledWith('Inventory deleted');
        });
        it('returns error JSON on failure', async () => {
            const req = { params: { id: 'xyz' } };
            const res = { json: jest.fn() };
            const error = new Error('delete failed');
            inventory.findByIdAndDelete.mockRejectedValue(error);
            await controller.deleteInventory(req, res);
            expect(res.json).toHaveBeenCalledWith(error);
        });
    });
});
