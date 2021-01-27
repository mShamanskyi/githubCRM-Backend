import { Pool } from 'pg';

export const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  password: process.env.POSTGRES_PASS,
  database: process.env.POSTGRES_DBNAME,
  port: 9999,
})