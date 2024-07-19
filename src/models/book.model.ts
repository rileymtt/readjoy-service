import dbTables from "config/dbTables";
import { execute } from "utils/mysql.connector";

export default {
  async getAll(userId: number) {
    const result = await execute<TBook[]>(
      `SELECT * FROM ${dbTables.Books} WHERE userId = ? ORDER BY id DESC LIMIT 100`,
      [userId]
    );
    return result;
  },
  async get(id: number) {
    const result = await execute<TBook[]>(
      `SELECT * FROM ${dbTables.Books} WHERE id = ? LIMIT 1`,
      [id]
    );
    return result[0];
  },
  async create(book: TBook) {
    const result = await execute(`INSERT INTO ${dbTables.Books} SET ?`, book);
    return result;
  },
  async update(userId: number, fields: Partial<TBook>) {
    const result = await execute<any>(
      `UPDATE ${dbTables.Books} SET ? WHERE id = ?`,
      [fields, userId]
    );
    return result;
  },
  async delete(id: number) {
    const result = await execute<any>(
      `DELETE FROM ${dbTables.Books} WHERE id = ?`,
      [id]
    );
    return result;
  },
};
