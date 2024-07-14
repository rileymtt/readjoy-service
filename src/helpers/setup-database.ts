import winstonLogger from "loggers/winston.logger";
import { execute } from "utils/mysql.connector";

const queries = [
  `
    CREATE TABLE IF NOT EXISTS Users (
        id INT NOT NULL AUTO_INCREMENT,
        walletAddress VARCHAR(255),
        username VARCHAR(255),
        email VARCHAR(255),
        password LONGTEXT,
        status INT NOT NULL DEFAULT 1,
        type INT NOT NULL DEFAULT 0,
        ref INT,
        createdAt TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updatedAt TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        PRIMARY KEY (id)
    );
`,
  `
    CREATE TABLE IF NOT EXISTS Profiles(
        id INT NOT NULL PRIMARY KEY,
        firstName VARCHAR(255),
        middleName VARCHAR(255),
        lastName VARCHAR(255),
        gender BOOLEAN,
        bio VARCHAR(255),
        profilePicture VARCHAR(255),
        coverPicture VARCHAR(255),
        dob TIMESTAMP(6),
        createdAt TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updatedAt TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        FOREIGN KEY (id) REFERENCES Users(id)
    );
`,
  `
    CREATE TABLE IF NOT EXISTS Books (
        id INT NOT NULL AUTO_INCREMENT,
        userId INT NOT NULL,
        title LONGTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
        description LONGTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
        image VARCHAR(255),
        images LONGTEXT,
        author VARCHAR(255),
        publishingCompany VARCHAR(255),
        categories VARCHAR(255),
        rate INT DEFAULT 0,
        status INT DEFAULT 0,
        createdAt TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updatedAt TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        PRIMARY KEY (id),
    FOREIGN KEY (userId) REFERENCES Users(id)
    );
`,
  `
    CREATE TABLE IF NOT EXISTS Administrators (
        id INT NOT NULL AUTO_INCREMENT,
        username VARCHAR(255),
        email VARCHAR(255),
        password LONGTEXT,
        type INT NOT NULL DEFAULT 0,
        createdAt TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updatedAt TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        PRIMARY KEY (id),
        UNIQUE (email)
    );
`,
  `
  CREATE TABLE IF NOT EXISTS UploadImages (
      id INT NOT NULL AUTO_INCREMENT,
      userId INT NOT NULL,
      url VARCHAR(255) NOT NULL,
      createdAt TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
      updatedAt TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
      PRIMARY KEY (id),
      FOREIGN KEY (userId) REFERENCES Users(id)
  );
`,
];
export default async () => {
  try {
    await execute(
      `
      CREATE TABLE IF NOT EXISTS Users (
        id INT NOT NULL AUTO_INCREMENT,
        walletAddress VARCHAR(255),
        username VARCHAR(255),
        email VARCHAR(255),
        password LONGTEXT,
        status INT NOT NULL DEFAULT 1,
        type INT NOT NULL DEFAULT 0,
        ref INT,
        createdAt TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updatedAt TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        PRIMARY KEY (id)
    );
  `,
      []
    );
    // for (const iterator of queries) {
    //   console.log(iterator);
    //   await execute(iterator, []);
    // }
    // await execute(
    //   `
    //         INSERT INTO Administrators(email, password, type)
    //         VALUES (?, ?, ?)
    //         ON DUPLICATE KEY UPDATE email=email;
    //     `,
    //   [
    //     "realbewhy@gmail.com",
    //     "$2b$10$x4aVIPYQh1n/P4M4gK1ak.Fh6KWF5A2Di.NGMdvJ7O3ckmq7M5OWC",
    //     0,
    //   ]
    // );
  } catch (error) {
    winstonLogger.error(`Error setting up database: ${error}`);
  }
};
