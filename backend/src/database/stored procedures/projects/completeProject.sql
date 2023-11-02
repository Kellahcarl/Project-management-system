CREATE PROCEDURE [dbo].[completeProject]
	@project_id varchar(100)
	
as

set nocount on;

begin
	UPDATE dbo.assignProjects
	SET 
	project_status = 'completed'
    	
	WHERE project_id = @project_id ;
end;