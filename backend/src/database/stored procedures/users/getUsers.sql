CREATE OR ALTER  PROCEDURE [dbo].[getUsers]
as

set nocount on;

begin
	select	u.[_id],
			u.username,
			u.email,			
			u.isDeleted,
			u.isAdmin
	from	[users] u ;
end;