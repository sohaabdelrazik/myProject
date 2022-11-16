import bcrypt from 'bcrypt';
import client from '../database';
export type user = {
  id?: Number;
  firstName: string;
  lastName: string;
  password: string;
};
const saltRounds = process.env.SALT_ROUNDS as string;
const pepper = process.env.BCRYPT_PASSWORD as string;

export class userInformation {
  async authenticate(
    firstName: String,
    password: String
  ): Promise<user | null> {
    const conn = await client.connect();
    const sql = 'SELECT password FROM users WHERE firstName=($1)';
    const result = await conn.query(sql, [firstName]);
    console.log(password + pepper);
    if (result.rows.length) {
      const User = result.rows[0];
      console.log(User);
      if (bcrypt.compareSync((password as string) + pepper, User.password)) {
        return User;
      } else {
        throw new Error('password not correct');
      }
    }

    conn.release();

    return null;
  }
  async create(u: user): Promise<user> {
    try {
      const sql =
        'INSERT INTO users (firstName,lastName,password) VALUES($1, $2,$3) RETURNING *';
      // @ts-ignore
      const conn = await client.connect();
      const hash = bcrypt.hashSync(u.password + pepper, Number(saltRounds));
      const result = await conn.query(sql, [u.firstName, u.lastName, hash]);

      const newUser = result.rows[0];
      console.log(newUser);
      conn.release();

      return newUser;
    } catch (err) {
      throw new Error(`Could not add new user  Error: ${err}`);
    }
  }
  async index(): Promise<user[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * from "users"';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`cannot get users ${error}`);
    }
  }
  async show(id: string): Promise<user> {
    try {
      const sql = 'SELECT * FROM users WHERE id=($1)';
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user for id = ${id}. Error: ${err}`);
    }
  }
  async delete(id: string): Promise<user> {
    try {
      const sql = 'DELETE FROM users WHERE id=($1)';
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      const book = result.rows[0];

      conn.release();

      return book;
    } catch (err) {
      throw new Error(`Could not delete book ${id}. Error: ${err}`);
    }
  }
}
