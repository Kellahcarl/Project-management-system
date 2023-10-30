CREATE  OR ALTER TABLE users (
	_id varchar(100) NOT NULL PRIMARY KEY,
	username varchar(100) NOT NULL,
	
	email varchar(250) NOT NULL,
	
	isDeleted BIT ,
	password varchar(250) NOT NULL,
)

create database PMS