import { type } from 'os';
import client from '../database';
export type product = {
  id?: number;
  name: string;
  price: Number;
};

export class productStore {
  async create(p: product): Promise<product> {
    try {
      const sql =
        'INSERT INTO products (name,price) VALUES($1, $2) RETURNING *';
      // @ts-ignore
      const conn = await client.connect();
      const result = await conn.query(sql, [p.name, p.price]);

      const newProduct = result.rows[0];
      console.log(newProduct);
      conn.release();

      return newProduct;
    } catch (err) {
      throw new Error(`Could not add new product  Error: ${err}`);
    }
  }
  async index(): Promise<product[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * from products';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`cannot get products ${error}`);
    }
  }
  async show(id: string): Promise<product> {
    try {
      const sql = 'SELECT * FROM products WHERE id=($1)';
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find product which id = ${id}. Error: ${err}`);
    }
  }
  async delete(id: string): Promise<product> {
    try {
      const sql = 'DELETE FROM products WHERE id=($1)';
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      const products = result.rows[0];

      conn.release();

      return products;
    } catch (err) {
      throw new Error(`Could not delete product ${id}. Error: ${err}`);
    }
  }
}
