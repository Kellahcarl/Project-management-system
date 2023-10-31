CREATE OR ALTER  PROCEDURE [dbo].[registerUser]
	@id varchar(100),
	@username varchar(100),	
	@email varchar(250),
	@password varchar(250),
	@isDeleted int,
	@isAdmin int
as

set nocount on;

begin
	INSERT INTO dbo.users
	(_id, username, email, password, isDeleted , isAdmin)
	VALUES
	(@id,@username, @email, @password, @isDeleted ,@isAdmin);
end;