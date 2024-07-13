import dbTables from "config/dbTables";
import { AdminQueries } from "queries";
import { execute } from "utils/mysql.connector";

export default {
  async create(email: string, hash: string, type: number) {
    await execute(
      `INSERT INTO ${dbTables.adminTable}(email, password, type) VALUES(?, ?, ?)`,
      [email, hash, type]
    );
  },
  async findOne(id: number) {
    return (
      await execute<TAdministrator[]>(AdminQueries.FindAdministrator, [id])
    )[0];
  },
  async findOneByEmail(email: string) {
    return (
      await execute<TAdministrator[]>(
        `SELECT * FROM Administrators WHERE email = ?`,
        [email]
      )
    )[0];
  },
  async update(id: number, data: Partial<TAdministrator>) {
    await execute(`UPDATE ${dbTables.adminTable} SET ? WHERE id = ?`, [
      data,
      id,
    ]);
  },
};
