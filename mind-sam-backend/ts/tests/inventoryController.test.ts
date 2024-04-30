import { Request, Response } from 'express';
import { postInventory, getInventory, updateInventory, deleteInventory } from '../controller/InventoryController';
import { inventory } from '../models/InventoryModel';

jest.mock('../models/InventoryModel', () => ({
  inventory: {
    save: jest.fn(),
    find: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  }
}));

describe('postInventory', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = { body: { /* your request body */ } };
    res = { send: jest.fn(), json: jest.fn() };
  });

  it('should save inventory data ', async () => {

  });

  it('should handle errors by sending JSON response', async () => {
 
  });
});