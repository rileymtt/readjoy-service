export const UserQueries = {
  GetUsers: `SELECT * FROM Users`,
  FindOneByEmail: `SELECT * FROM Users WHERE email = ?`,
  AddUser: `INSERT INTO Users(walletAddress, type) VALUES(?, ?)`,
  CreateUser: `INSERT INTO Users(email, password, type, ref) VALUES(?, ?, ?, ?)`,
  FindWalletAddress: `SELECT * FROM Users WHERE walletAddress = ?`,
  AddProfile: `INSERT INTO Profiles(id, profilePicture) VALUES(?, ?)`,
  FindProfile: `
    SELECT 
      p.*,
      u.walletAddress,
      u.email,
      u.username,
      u.id AS id,
      u.status AS status,
      u.ref AS ref
    FROM 
      Users as u
    LEFT JOIN 
      Profiles as p
    ON
      p.id = u.id
    WHERE u.id = ?  
    LIMIT 1
  `,
  UserRate: `
    SELECT 
	    u.email,
      u.username,
      u.walletAddress, 
      p.*,
      SUM(DISTINCT a.totalView) AS totalView,
      IF(u.username IS NOT NULL, u.username, IF(p.firstName IS NOT NULL, CONCAT(p.lastName, " ", p.firstName), u.email)) as displayName,
      u.id
    FROM 
      Users as u
    LEFT JOIN 
      Profiles as p
    ON
      p.id = u.id
    LEFT JOIN (
	    SELECT 
		    a.*, 
		    COUNT(DISTINCT v.id) as totalView
	    FROM 
        Articles AS a
	    LEFT JOIN 
        ArticleSeen AS v
		  ON 
        v.articleId = a.id
	    GROUP BY 
        a.id
    ) AS a
    ON 
      u.id = a.userId
    GROUP BY 
      u.id, p.id
    ORDER BY 
      totalView
    DESC
    LIMIT 10
  `,
};
