CREATE OR ALTER PROCEDURE [dbo].[getUserById]
	@id	varchar(250)
as

set nocount on;

begin
	select	u.[_id],
			u.email,
			u.username,
			u.isAdmin,
			u.isDeleted,
			u.password
	from	[users] u where _id= @id;
end;

exec getUserById