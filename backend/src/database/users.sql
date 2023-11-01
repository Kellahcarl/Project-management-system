CREATE TABLE users (
	_id varchar(100) NOT NULL PRIMARY KEY,
	username varchar(100) NOT NULL,
	email varchar(100) NOT NULL,
	password varchar(250) NOT NULL,
	isDeleted bit NOT NULL DEFAULT 0,
	isAdmin bit NOT NULL DEFAULT 0,
	
)