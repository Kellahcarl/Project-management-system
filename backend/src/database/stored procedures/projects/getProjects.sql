CREATE OR ALTER PROCEDURE [dbo].[getProjects]

AS
BEGIN
    SET NOCOUNT ON;

	SELECT * FROM dbo.projects 
			where isDeleted = 0		
END