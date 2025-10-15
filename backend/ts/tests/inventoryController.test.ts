import { Request, Response } from 'express';
import * as controller from '../controller/InventoryController';

jest.mock('../models/InventoryModel', () => {
  const inventory = jest.fn();
  (inventory as any).find = jest.fn();
  (inventory as any).findByIdAndUpdate = jest.fn();
  (inventory as any).findByIdAndDelete = jest.fn();
  return { inventory };
});

const { inventory } = require('../models/InventoryModel');

describe('InventoryController (ts)', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('postInventory', () => {
    it('sends Success when save resolves', async () => {
      const req = { body: { inventoryName: 'item', inventoryDate: '2020-01-01' } } as Partial<Request>;
      const res = { send: jest.fn(), json: jest.fn() } as Partial<Response>;
      (inventory as any).mockImplementation(() => ({ save: jest.fn().mockResolvedValue(undefined) }));

      await (controller as any).postInventory(req, res);

      expect(res.send).toHaveBeenCalledWith('Success');
    });

    it('returns error JSON when save rejects', async () => {
      const req = { body: { inventoryName: 'item' } } as Partial<Request>;
      const res = { send: jest.fn(), json: jest.fn() } as Partial<Response>;
      const error = new Error('db failure');
      (inventory as any).mockImplementation(() => ({ save: jest.fn().mockRejectedValue(error) }));

      await (controller as any).postInventory(req, res);

      expect(res.json).toHaveBeenCalledWith(error);
    });
  });

  describe('getInventory', () => {
    it('returns all inventory when no query provided', async () => {
      const req = { query: {} } as any;
      const sample = [{ inventoryName: 'a' }];
      (inventory as any).find.mockResolvedValue(sample);
      const res = { send: jest.fn(), json: jest.fn() } as Partial<Response>;

      await (controller as any).getInventory(req, res);

      expect((inventory as any).find).toHaveBeenCalledWith({});
      expect(res.send).toHaveBeenCalledWith(sample);
    });

    it('queries by inventoryId when inid present', async () => {
      const req = { query: { inid: '123' } } as any;
      const sample = [{ inventoryId: 123 }];
      (inventory as any).find.mockResolvedValue(sample);
      const res = { send: jest.fn(), json: jest.fn() } as Partial<Response>;

      await (controller as any).getInventory(req, res);

      expect((inventory as any).find).toHaveBeenCalledWith({ inventoryId: req.query.inid });
      expect(res.send).toHaveBeenCalledWith(sample);
    });
  });

  describe('updateInventory', () => {
    it('responds with Inventory Updated on success', async () => {
      const req = { params: { id: 'abc' }, body: { inventoryName: 'updated' } } as any;
      (inventory as any).findByIdAndUpdate.mockResolvedValue({});
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() } as any;

      await (controller as any).updateInventory(req, res);

      expect((inventory as any).findByIdAndUpdate).toHaveBeenCalledWith(req.params.id, req.body, expect.any(Object));
      expect(res.json).toHaveBeenCalledWith('Inventory Updated');
    });

    it('returns 500 json on error', async () => {
      const req = { params: { id: 'abc' }, body: {} } as any;
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() } as any;
      const error = new Error('update failed');
      (inventory as any).findByIdAndUpdate.mockRejectedValue(error);

      await (controller as any).updateInventory(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(error);
    });
  });

  describe('deleteInventory', () => {
    it('responds with Inventory deleted on success', async () => {
      const req = { params: { id: 'xyz' } } as any;
      (inventory as any).findByIdAndDelete.mockResolvedValue({});
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() } as any;

      await (controller as any).deleteInventory(req, res);

      expect((inventory as any).findByIdAndDelete).toHaveBeenCalledWith(req.params.id);
      expect(res.json).toHaveBeenCalledWith('Inventory deleted');
    });

    it('returns error JSON on failure', async () => {
      const req = { params: { id: 'xyz' } } as any;
      const res = { json: jest.fn() } as any;
      const error = new Error('delete failed');
      (inventory as any).findByIdAndDelete.mockRejectedValue(error);

      await (controller as any).deleteInventory(req, res);

      expect(res.json).toHaveBeenCalledWith(error);
    });
  });
});