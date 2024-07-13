DROP DATABASE readjoy_db;
CREATE DATABASE IF NOT EXISTS readjoy_db;
USE readjoy_db;
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
-- CREATE TABLE IF NOT EXISTS Authors(
--     id INT NOT NULL PRIMARY KEY,
--     name VARCHAR(255),
--     alias VARCHAR(255),
--     avatar VARCHAR(255),
--     createdAt TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
--     updatedAt TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
-- );
-- CREATE TABLE IF NOT EXISTS PublishingCompanies(
--     id INT NOT NULL PRIMARY KEY,
--     name VARCHAR(255),
--     alias VARCHAR(255),
--     avatar VARCHAR(255),
--     createdAt TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
--     updatedAt TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
-- );
-- CREATE TABLE IF NOT EXISTS Categories (
--     id INT NOT NULL AUTO_INCREMENT,
--     label VARCHAR(255),
--     parentId INT,
--     rate INT DEFAULT 0,
--     status INT DEFAULT 1,
--     image VARCHAR(255),
--     createdAt TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
--     updatedAt TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
--     PRIMARY KEY (id)
-- );
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
-- CREATE TABLE IF NOT EXISTS BookDetails (
--     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     bookId INT NOT NULL,
--     userId INT NOT NULL,
--     readStatus INT DEFAULT 0,
--     isFavorite BOOLEAN DEFAULT false,
--     rating INT DEFAULT 0,
--     note LONGTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
--     createdAt TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
--     updatedAt TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
-- );
-- CREATE TABLE IF NOT EXISTS BookLinkedAuthor (
--     id INT NOT NULL AUTO_INCREMENT,
--     bookId INT,
--     authorId INT,
--     PRIMARY KEY (id),
--     FOREIGN KEY (bookId) REFERENCES Books(id),
--     FOREIGN KEY (authorId) REFERENCES Authors(id)
-- );
-- CREATE TABLE IF NOT EXISTS BookLinkedCategory (
--     id INT NOT NULL AUTO_INCREMENT,
--     bookId INT,
--     categoryId INT,
--     PRIMARY KEY (id),
--     FOREIGN KEY (bookId) REFERENCES Books(id),
--     FOREIGN KEY (categoryId) REFERENCES Categories(id)
-- );
-- CREATE TABLE IF NOT EXISTS BookLinkedPublishingCompany (
--     id INT NOT NULL AUTO_INCREMENT,
--     bookId INT,
--     publishingCompanyId INT,
--     PRIMARY KEY (id),
--     FOREIGN KEY (bookId) REFERENCES Books(id),
--     FOREIGN KEY (publishingCompanyId) REFERENCES PublishingCompanies(id)
-- );
CREATE TABLE IF NOT EXISTS Administrators (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(255),
    email VARCHAR(255),
    password LONGTEXT,
    type INT NOT NULL DEFAULT 0,
    createdAt TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updatedAt TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    PRIMARY KEY (id)
);
INSERT INTO Administrators(email, password, type)
VALUES (
        "realbewhy@gmail.com",
        "$2b$10$x4aVIPYQh1n/P4M4gK1ak.Fh6KWF5A2Di.NGMdvJ7O3ckmq7M5OWC",
        0
    );
-- CREATE TABLE IF NOT EXISTS Notifications (
--     id INT NOT NULL AUTO_INCREMENT,
--     sender INT,
--     receiver INT,
--     type INT,
--     articleId INT,
--     commentId INT,
--     createdAt TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
--     updatedAt TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
--     unread INT NOT NULL DEFAULT 1,
--     PRIMARY KEY (id),
--     FOREIGN KEY (articleId) REFERENCES Articles(id),
--     FOREIGN KEY (commentId) REFERENCES Comments(id),
--     FOREIGN KEY (sender) REFERENCES Users(id),
--     FOREIGN KEY (receiver) REFERENCES Users(id)
-- );
-- CREATE TABLE IF NOT EXISTS UploadImages (
--     id INT NOT NULL AUTO_INCREMENT,
--     userId INT NOT NULL,
--     url VARCHAR(255) NOT NULL,
--     createdAt TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
--     updatedAt TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
--     PRIMARY KEY (id),
--     FOREIGN KEY (userId) REFERENCES Users(id)
-- );
-- CREATE TABLE IF NOT EXISTS Settings(
--     id INT NOT NULL AUTO_INCREMENT,
--     skey VARCHAR(255) NOT NULL,
--     svalue VARCHAR(255) NULL NULL,
--     createdAt TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
--     updatedAt TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
--     PRIMARY KEY (id)
-- );