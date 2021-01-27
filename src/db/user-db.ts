import { QueryResult } from 'pg';
import { UserData } from 'entities.types';
import { pool } from './database';

export default class UserDataBase {
  static async findByEmail(email: string) {

    const sql = `
        SELECT * 
        FROM users
        WHERE lower(email) = lower($1)
    `;
    const response: QueryResult = await pool.query(sql, [email]);

    return response.rows;
  }

  static async insertUser({ id, email, passwordHash }: UserData) {

    const sql = `
        INSERT 
        INTO users (id, email, password_hash)
        VALUES ($1, $2, $3)
    `;
    const response: QueryResult = await pool.query(sql, [id, email, passwordHash]);

    return response.rows;
  }
}