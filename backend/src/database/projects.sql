CREATE TABLE projects (
	project_id varchar(100) NOT NULL PRIMARY KEY,
	project_name varchar(250) NOT NULL,
	
	project_description varchar(250) NOT NULL,
	dueDate DATE NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	isDeleted BIT NOT NULL DEFAULT 0,
	isCompleted BIT NOT NULL DEFAULT 0,
)