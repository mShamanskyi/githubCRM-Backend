import Knex from 'knex';
import * as fs from 'fs';
import * as path from 'path';

const host: string = process.env.POSTGRES_HOST;
const user: string = process.env.POSTGRES_USER;
const password: string = process.env.POSTGRES_PASS;
const connectiosCache: { [key: string]: Knex } = {};
const developmentMigrationsFolder = path.resolve(__dirname, './db/migrations');

export const dbProvider = () => {
  const createDbConnection = async (dbName: string): Promise<Knex> => {
    const connection = connectiosCache[dbName];

    if (!connection) {
      const newConnection = Knex({
        client: 'postgres',
        connection: {
          host: host,
          user: user,
          password: password,
          database: dbName,
          multipleStatements: true
        },
        pool: { min: 0, max: 7 }
      });

      connectiosCache[dbName] = newConnection;

      return newConnection;
    }

    return connection;
  }

  const checkDbConnection = async (): Promise<void> => {
    const knex = await createDbConnection(process.env.POSTGRES_DBNAME);

    await knex.raw('select * from TABLES');
  }

  const needInit = async (): Promise<boolean> => {
    try {
      const knex = await createDbConnection(process.env.POSTGRES_DBNAME);

      await knex.raw('select * from users');
      return false;
    } catch (e) {
      return true;
    }
  }

  const runInitialDbSchemaMigration = async (): Promise<void> => {
    if (await needInit()) {
      const knex = await createDbConnection(process.env.POSTGRES_DBNAME);
      const schemaFiles: string[] = fs
        .readdirSync(developmentMigrationsFolder)
        .filter(filename => filename.includes('.sql'));

      for (const filename of schemaFiles) {
        const filePath = path.join(developmentMigrationsFolder, filename);
        const fileContents = fs.readFileSync(filePath);

        await knex.raw(fileContents.toString());
      }
    }
  }

  return {
    checkDbConnection,
    runInitialDbSchemaMigration
  }
}