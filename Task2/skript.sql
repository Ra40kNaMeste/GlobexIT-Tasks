SET STATISTICS TIME ON;
USE testdb;

DECLARE @parent INT;
SET @parent = (SELECT TOP(1) subdivisions.id FROM collaborators, subdivisions
	WHERE collaborators.id=710253 AND collaborators.subdivision_id = subdivisions.id);

DECLARE @level BIGINT;
WITH sub_data (sub_name, sub_id, sub_level)
AS(
	SELECT s.name AS sub_name, s.id AS sub_id, 1 AS sub_level FROM subdivisions AS s
		WHERE s.id = @parent AND s.id != 100055 AND s.id != 100059

	UNION ALL

	SELECT s.name AS sub_name, s.id AS sub_id, slave.sub_level + 1 AS sub_level FROM subdivisions AS s
	JOIN sub_data AS slave ON s.parent_id = slave.sub_id AND s.id != 100055 AND s.id != 100059
)

SELECT c.id AS id, c.name AS name, d.sub_name AS sub_name, d.sub_id AS sub_id, d.sub_level AS sub_level, 
	(SELECT COUNT(*) FROM collaborators AS c WHERE c.subdivision_id = sub_id) AS colls_count 
	FROM sub_data AS d, collaborators AS c
	WHERE c.subdivision_id = d.sub_id AND c.age < 40
	ORDER BY d.sub_level ASC
