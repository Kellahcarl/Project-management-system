CREATE TABLE users (
	_id varchar(100) NOT NULL PRIMARY KEY,
	username varchar(100) NOT NULL,
	
	email varchar(250) NOT NULL,
	
	isDeleted BIT ,
	isAdmin Bit not null,
	password varchar(250) NOT NULL,
)

DROP TABLE users

create database PMS