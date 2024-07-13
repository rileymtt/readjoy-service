import { execute } from "utils/mysql.connector";
const mysql = require("mysql");

export const insertRecord = async ({
  tableName,
  fields,
}: {
  tableName: string;
  fields: { [key: string]: string };
}) => {
  let sql = `INSERT INTO ${tableName}(`;

  for (const [key, value] of Object.entries(fields)) {
    sql += `${key},`;
  }

  sql = sql.substring(0, sql.length - 1);

  sql += `) VALUES(`;

  for (const [key, value] of Object.entries(fields)) {
    sql += `${mysql.escape(value)},`;
  }

  sql = sql.substring(0, sql.length - 1);

  sql += `)`;

  const result = await execute<any>(sql, []);
  return result;
};

export const updateRecord = async ({
  tableName,
  id,
  fields,
}: {
  tableName: string;
  id: number;
  fields: { [key: string]: string };
}) => {
  let sql = `UPDATE ${tableName} SET `;
  let conditions = [];

  for (const [key, value] of Object.entries(fields)) {
    conditions.push(`${key} = ${mysql.escape(value)}`);
  }

  if (conditions.length > 0) {
    sql += conditions.join(", ");
  } else {
    sql += "1";
  }

  sql += ` WHERE id = ${id}`;

  const result = await execute<any>(sql, []);
  return result;
};

export const deleteRecord = async ({
  tableName,
  id,
}: {
  tableName: string;
  id: any;
}) => {
  let sql = `DELETE FROM ${tableName} WHERE id = ${id}`;

  const result = await execute<any>(sql, []);
  return result;
};

export const archiveRecord = async ({
  tableName,
  id,
}: {
  tableName: string;
  id: any;
}) => {
  let sql = `UPDATE ${tableName} SET status = 0 WHERE id = ${id}`;

  const result = await execute<any>(sql, []);
  return result;
};

export const getRecords = async ({
  page = 1,
  pageSize = 10,
  tableName,
  subTables,
  sortWith,
  filterWith,
  searchWith,
  searchList = [],
  filterList = [],
  extraSelect = "",
}: TExtraQueryField): Promise<TExtraQueryResult> => {
  try {
    let sql = `SELECT ${tableName}.* `;
    let count = `SELECT Count(*) as count `;
    subTables?.map((subTable) => {
      subTable.columns.map((col) => {
        sql += `, ${subTable.tableName}.${col} `;
      });
      const { sosTable } = subTable;
      sosTable?.columns.map((col) => {
        sql += `, ${sosTable.tableName}.${col} `;
      });
    });
    sql += extraSelect;
    sql += `FROM ${tableName} `;
    count += `FROM ${tableName} `;
    subTables?.map((subTable) => {
      sql += `LEFT JOIN ${subTable.tableName} ${subTable.alias || ""} ON ${
        subTable.alias || subTable.tableName
      }.${subTable.column} = ${tableName}.${subTable.refColumn} `;
      const { sosTable } = subTable;
      if (sosTable) {
        sql += `LEFT JOIN ${sosTable.tableName} ${sosTable.alias || ""} ON ${
          sosTable.alias || sosTable.tableName
        }.${sosTable.column} = ${subTable.tableName}.${sosTable.refColumn} `;
      }
      count += `LEFT JOIN ${subTable.tableName} ${subTable.alias || ""} ON ${
        subTable.alias || subTable.tableName
      }.${subTable.column} = ${tableName}.${subTable.refColumn} `;
    });
    sql += `WHERE 1 `;
    count += `WHERE 1 `;
    filterWith?.map((f) => {
      if (f.key && f.value) {
        sql += `AND ${f.key} = ${f.value} `;
        count += `AND ${f.key} = ${f.value} `;
      }
    });
    if (searchWith?.key && searchWith?.value) {
      sql += ` AND ${searchWith.key} LIKE "%${searchWith.value}%" `;
      count += ` AND ${searchWith.key} LIKE "%${searchWith.value}%" `;
    }
    // sql += ` GROUP BY ${tableName}.id `;
    if (sortWith?.key) {
      sql += ` ORDER BY ${sortWith.key ? `${sortWith.key}` : `id`} ${
        sortWith.type
      } `;
    }
    sql += `LIMIT ${(page - 1) * pageSize}, ${pageSize};`;
    count += `;`;

    const [items, itemCount] = await Promise.all([
      execute<any[]>(sql, []),
      (async () => {
        const itemCount = (await execute<any>(count, []))[0].count;
        return itemCount;
      })(),
    ]);

    const pageCount = Math.ceil(itemCount / pageSize);

    return {
      filterList,
      itemCount,
      items,
      page,
      pageSize,
      pageCount,
      searchList,
    };
  } catch (error) {
    throw error;
  }
};
