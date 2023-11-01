CREATE OR ALTER PROCEDURE [dbo].[createProject]
	@id varchar(100),
	@name varchar(100),
	@dueDate date,
	@description varchar(250)
AS

BEGIN
    set nocount on;

    INSERT INTO dbo.projects
    (_id, name, dueDate,description, isDeleted, isCompleted)
    VALUES
    (@id, @dueDate, @description, 0, 0);
END