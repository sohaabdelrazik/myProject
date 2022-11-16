import express, { Request, Response } from 'express';
import { userInformation, user } from '../models/user';
import jwt from 'jsonwebtoken';
const secret = process.env.TOKEN_SECRET as string;
const store = new userInformation();
export const User = (app: express.Application) => {
  app.get('/user', index);
  app.get('/user/:id', show);
  app.post('/user', create);
  app.post('/users', authenticate);
  app.delete('/user/:id', destroy);
};
const verifyAuthToken = async (
  req: Request,
  res: Response,
  next: () => void
) => {
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(' ')[1];
    // const ourToken=await
    const decoded = jwt.verify(token, secret);
    if (decoded) {
      next();
    }
  } catch (error) {
    res.status(401);
    res.json(error);
  }
};
const index = async (req: Request, res: Response) => {
  // try {
  //     const authorizationHeader = req.headers.authorization as string
  //     const token = JSON.parse(authorizationHeader.split(' ')[1])
  //     jwt.verify(token, secret)
  // } catch(err) {
  //     res.status(401)
  //     res.json('Access denied, invalid token')
  //     return
  // }
  // const token:Promise<void>=create(req,res);

  // try{

  //     jwt.verify(token,secret)
  // }
  // catch(error){

  //     res.json('invalid token');
  // }
  const users = await store.index();
  res.json(users);
};
const show = async (req: Request, res: Response) => {
  const user = await store.show(req.params.id);
  res.json(user);
};
export const create = async (req: Request, res: Response) => {
  try {
    const User: user = {
      firstName: req.body.firstName,
      password: req.body.password,
      lastName: req.body.lastName,
    };
    const newUser = await store.create(User);
    var token = jwt.sign({ user: newUser }, secret);
    if (!token) {
      throw new Error('token is empty');
    }
    res.json(token);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
const authenticate = async (req: Request, res: Response) => {
  const user: user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
  };
  try {
    const u = await store.authenticate(user.firstName, user.password);
    var token = jwt.sign({ user: u }, secret);
    if (!token) {
      throw new Error('token is empty');
    }
    res.json(token);
  } catch (error) {
    res.status(401);
    res.json({ error });
  }
};
const destroy = async (req: Request, res: Response) => {
  const deleted = await store.delete(req.params.id);
  res.json(deleted);
};
export default User;
