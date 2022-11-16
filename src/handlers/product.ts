import express, { Request, Response } from 'express';
import { productStore, product } from '../models/product';
import jwt from 'jsonwebtoken';
const secret = process.env.TOKEN_SECRET as string;
const store = new productStore();
export const Product = (app: express.Application) => {
  app.get('/product', index);
  app.get('/product/:id', show);
  app.post('/product', create);
  app.delete('/product/:id', destroy);
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
  try {
    const products = await store.index();
    res.json(products);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
const show = async (req: Request, res: Response) => {
  try {
    const product = await store.show(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
const create = async (req: Request, res: Response) => {
  try {
    const Product: product = {
      name: req.body.name,
      price: req.body.price,
    };
    const newProduct = await store.create(Product);
    console.log(newProduct);
    res.json(newProduct);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const showen = await store.show(req.params.id);
    const deleted = await store.delete(req.params.id);
    res.json(showen);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
export default Product;
