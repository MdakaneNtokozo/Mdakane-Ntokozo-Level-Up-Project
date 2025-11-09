-- Made use of MySQL for the database

CREATE TABLE Graduate(
	Guid INT PRIMARY KEY,
	FirstName CHAR(100),
	LastName CHAR(100),
	EmailAddress CHAR(100),
    phoneNumber CHAR(100),
	DateOfBirth DATETIME NOT NULL,
	DateCreated DATETIME,
	DateEdited DATETIME,
	IsDeleted BOOLEAN DEFAULT FALSE
);