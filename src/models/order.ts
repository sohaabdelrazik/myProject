import client from '../database';
export type order = {
  id?: string;
  status: string;
  user_id: string;
};

export class orderStore {
  async create(o: order): Promise<order> {
    try {
      const sql =
        'INSERT INTO orders (status,user_id) VALUES($1,$2) RETURNING *';
      // @ts-ignore
      const conn = await client.connect();
      const result = await conn.query(sql, [o.status, o.user_id]);

      const User = result.rows[0];

      conn.release();

      return User;
    } catch (err) {
      throw new Error(`Could not add new order  Error: ${err}`);
    }
  }
  async index(): Promise<order[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders';
      const result = await conn.query(sql);
      conn.release();
      console.log(result.rows);
      const users = result.rows;
      return users;
    } catch (error) {
      throw new Error(`cannot get order ${error}`);
    }
  }
  async show(id: string): Promise<order> {
    try {
      const sql = 'SELECT * FROM orders WHERE user_id=($1)';
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not find order where user_id = ${id}. Error: ${err}`
      );
    }
  }
  async addProduct(
    quantity: number,
    orderId: string,
    productId: string
  ): Promise<order> {
    try {
      const sql =
        'INSERT INTO order_products (quantity,order_id,product_id) VALUES($1,$2,$3) RETURNING *';
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [quantity, orderId, productId]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not add product${productId} in order ${orderId}. Error: ${err}`
      );
    }
  }
  async delete(id: string): Promise<order> {
    try {
      const sql = 'DELETE FROM orders WHERE id=($1)';
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`);
    }
  }
  /*async addProduct(quantity: number, orderId: string, productId: string): Promise<Order> {
    // get order to see if it is open
    try {
      const ordersql = 'SELECT * FROM orders WHERE id=($1)'
      //@ts-ignore
      const conn = await Client.connect()

      const result = await conn.query(ordersql, [orderId])

      const order = result.rows[0]

      if (order.status !== "open") {
        throw new Error(`Could not add product ${productId} to order ${orderId} because order status is ${order.status}`)
      }

      conn.release()
    } catch (err) {
      throw new Error(`${err}`)
    }

    try {
      const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
      //@ts-ignore
      const conn = await Client.connect()

      const result = await conn
          .query(sql, [quantity, orderId, productId])

      const order = result.rows[0]

      conn.release()

      return order
    } catch (err) {
      throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`)
    }
  }*/
}
