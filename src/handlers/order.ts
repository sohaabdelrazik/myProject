import express, { Request, Response } from 'express';
import { orderStore, order } from '../models/order';
import jwt from 'jsonwebtoken';
const secret = process.env.TOKEN_SECRET as string;
const store = new orderStore();
export const Order = (app: express.Application) => {
  app.get('/order', index);
  app.get('/order/:id', show);
  app.post('/order', create);
  app.post('/order/:id/product', addProduct);
  app.delete('/order/:id', destroy);
};
const verifyAuthToken = (req: Request, res: Response, next: () => void) => {
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(' ')[1];
    const decoded = jwt.verify(token, secret);

    next();
  } catch (error) {
    res.status(401);
  }
};
const index = async (req: Request, res: Response) => {
  const ow = await store.index();
  res.json(ow);
};

const create = async (req: Request, res: Response) => {
  try {
    const orderr: order = {
      status: req.body.status,
      user_id: req.body.user_id,
    };
    const newOrder = await store.create(orderr);
    res.json(newOrder);
    console.log(newOrder);
  } catch (error) {
    res.status(400);
    throw new Error(`cannot create new order${error}`);
  }
};

const addProduct = async (req: Request, res: Response) => {
  const quantity: number = Number(req.body.quantity);
  const orderId: string = req.params.id;
  const productId: string = req.body.productId;
  try {
    const addedProduct = await store.addProduct(quantity, orderId, productId);
    res.json(addedProduct);
    console.log(addedProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
const show = async (req: Request, res: Response) => {
  const order = await store.show(req.params.user_id);
  res.json(order);
};
const destroy = async (req: Request, res: Response) => {
  const showen = await store.show(req.params.id);
  const deleted = await store.delete(req.params.id);
  res.json(showen);
};
export default Order;
