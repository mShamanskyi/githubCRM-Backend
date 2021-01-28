import { QueryResult } from 'pg';
import { ProjectData } from 'entities.types';
import { pool } from './database';

export default class ProjectDataBase {
  static async getUserProjects(id: string): Promise<ProjectData[]> {
    const sql = `
        SELECT * 
        FROM projects
        WHERE lower(user_id) = lower($1)
    `;

    const response: QueryResult = await pool.query(sql, [id]);
    return response.rows;
  }
}