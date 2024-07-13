import dbTables from "config/dbTables";
import { Helper } from "helpers";
import { UserQueries } from "queries/user.queries";
import { execute } from "utils/mysql.connector";

export default {
  async createWithEmail(
    email: string,
    password: string,
    type: number = 0,
    ref?: number
  ) {
    const result = await execute<{ insertId: number }>(UserQueries.CreateUser, [
      email,
      password,
      type,
      ref,
    ]);
    return result;
  },
  async createWalletAddress(walletAddress: string, type: number = 0) {
    const result = await execute<{ insertId: number }>(UserQueries.AddUser, [
      walletAddress,
      type,
    ]);
    return result;
  },
  async findOneByEmail(email: string) {
    const check = await execute<TUser[]>(UserQueries.FindOneByEmail, [email]);
    return check;
  },
  async findWalletAddress(walletAddress: string) {
    return (
      await execute<TUser[]>(UserQueries.FindWalletAddress, [walletAddress])
    )[0];
  },
  async findProfile(userId: number) {
    const user = (
      await execute<TAccount[]>(UserQueries.FindProfile, [userId])
    )[0];
    if (user) {
      user.displayName = Helper.Format.formatHiddenName({
        email: user.email,
        firstname: user.firstName,
        lastname: user.lastName,
        username: user.username,
        walletAddress: user.walletAddress,
      });
    }
    return user;
  },
  async getCountUnderRef(userId: number) {
    const query = `SELECT COUNT(id) AS count FROM ${dbTables.userTable} WHERE ref = ?`;
    const result = await execute<{ count: number }[]>(query, [userId]);
    return result[0].count;
  },
  async update(userId: number, fields: Partial<TUser>) {
    const result = await execute<any>(
      `UPDATE ${dbTables.userTable} SET ? WHERE id = ?`,
      [fields, userId]
    );
    return result;
  },
};
