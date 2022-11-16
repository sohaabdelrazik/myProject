import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();
export let client: Pool;
const {
  POSTGRES_HOST,
  POSTGRES_DP,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  ENV,
  POSTGRES_DP_test,
} = process.env;

console.log(ENV);
if (ENV === 'dev') {
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DP,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
} else if (ENV === 'test') {
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DP_test,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
}
export default client;
