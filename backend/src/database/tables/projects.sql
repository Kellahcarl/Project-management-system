CREATE TABLE projects (
	project_id varchar(100) NOT NULL PRIMARY KEY,
	project_name varchar(250) NOT NULL,
	project_status VARCHAR(20) default 'unassigned' ,
	project_description varchar(250) NOT NULL,
	dueDate DATE ,
	created_at TIMESTAMP 
)

drop TABLE projects


select * from dbo.projects