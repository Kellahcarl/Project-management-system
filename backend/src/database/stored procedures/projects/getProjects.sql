
CREATE or alter PROCEDURE [dbo].[getProjects]
	
as

set nocount on;

begin
	select project_id, project_name, project_status, project_description, dueDate   
	from projects  
	order by created_at DESC
   
end;