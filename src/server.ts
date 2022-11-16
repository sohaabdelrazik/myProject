
import express, {  json, Request, Response } from 'express';
import Product from './handlers/product';
import User from './handlers/user';
import cors from 'cors';
import Order from './handlers/order';
const app: express.Application = express();
// const address: string = '0.0.0.0:3000';
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(cors());
app.use(json());
app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!ddddddddd');
});
User(app);
Order(app);
Product(app);
const port: number = 3001;
// create server
app.listen(port, (): void => {
  console.log(`server running in http://localhost:${port}`);
});
export default app;