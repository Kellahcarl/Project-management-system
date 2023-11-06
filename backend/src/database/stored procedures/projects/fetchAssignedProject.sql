CREATE or alter PROCEDURE fetchAssignedProject
    @user_id varchar(100)
AS
BEGIN
    SELECT p.project_id, p.project_name, p.project_description, p.dueDate
    FROM AssignedProjects ap
    INNER JOIN projects p ON ap.project_id = p.project_id
    WHERE ap.user_id = @user_id
        AND p.project_status = 'assigned';
END
