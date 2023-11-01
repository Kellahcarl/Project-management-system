CREATE PROCEDURE [dbo].[sp_updateProject]
	@id varchar(100),
	@name varchar(100),
	@duedate date,
	@description varchar(500)
as

set nocount on;

begin
	UPDATE dbo.projects
	SET 
	name=@name,
	description=@description,
	duedate=@duedate
	
	WHERE _id = @id ;
end;