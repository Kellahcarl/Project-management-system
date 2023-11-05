CREATE or alter PROCEDURE [dbo].[unAssignProject]
	@project_id varchar(100),
    @user_id varchar(100)
	
as

set nocount on;

begin
	delete from AssignedProjects
    

    where project_id = @project_id and user_id = @user_id
    
    
end;