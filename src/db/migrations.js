const dotenv = require('dotenv');
const { Client } = require('pg');
const { migrate } = require('postgres-migrations');

dotenv.config();

const config = {
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DBNAME,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASS
};

const client = new Client(config);

async function init() {
  await client.connect();

  try {
    const res = await migrate({ client }, __dirname + '/migrations', { logger: console.log });
    console.log(res);
  } catch (err) {
    console.log("Migration failed:", err)
  } finally {
    await client.end();
  }
}

init();
