CREATE TABLE AssignedProjects (
	
	project_id varchar(100) NOT NULL,
	user_id varchar(100) NOT NULL,
	project_status VARCHAR(20) default "unassigned" CHECK (status IN ('unassigned', 'inprogress', 'completed')),

	FOREIGN KEY (task_id) REFERENCES projects (_id),
	FOREIGN KEY (user_id) REFERENCES users (_id)
)