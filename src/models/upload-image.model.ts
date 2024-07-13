import dbTables from "config/dbTables";
import { execute } from "utils/mysql.connector";

export default {
  async multiCreate(urls: string[], userId: number) {
    if (urls.length > 0) {
      let query = `INSERT INTO ${dbTables.uploadImageTable}(userId, url) VALUES`;
      for (const iterator of urls) {
        query = query + `(${userId}, "${iterator}"),`;
      }
      query = query.substring(0, query.length - 1);
      await execute<any>(query, []);
    }
  },
};
