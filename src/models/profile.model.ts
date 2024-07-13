import dbTables from "config/dbTables";
import generateImage from "helpers/generate-image";
import { UserQueries } from "queries/user.queries";
import { execute } from "utils/mysql.connector";

export default {
  async create(userId: number) {
    const randomAvatar = await generateImage();
    const result = await execute<{ insertId: number }>(UserQueries.AddProfile, [
      userId,
      randomAvatar,
    ]);
    return result;
  },
  async update(userId: number, fields: Partial<TUserProfile>) {
    const result = await execute<any>(
      `UPDATE ${dbTables.profileTable} SET ? WHERE id = ?`,
      [fields, userId]
    );
    return result;
  },
};
