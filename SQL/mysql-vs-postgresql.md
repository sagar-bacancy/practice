# PostgreSQL vs MySQL Syntax Differences

This document compares common syntax differences between PostgreSQL and MySQL.

## 1. String Concatenation

- **PostgreSQL**:
  Use the `||` operator to concatenate strings.

  `SELECT 'Hello' || ' ' || 'World';`

- **MySQL**:
  Use the `CONCAT()` function.

  `SELECT CONCAT('Hello', ' ', 'World');`

## 2. Auto-Increment

- **PostgreSQL**:
  Use the `SERIAL` keyword or `BIGSERIAL` for auto-incrementing fields.

  `CREATE TABLE users ( id SERIAL PRIMARY KEY, name VARCHAR(100) );`

- **MySQL**:
  Use the `AUTO_INCREMENT` keyword.

  `CREATE TABLE users ( id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100) );`

## 3. Case Sensitivity in Column Names

- **PostgreSQL**:
  By default, PostgreSQL treats column names as case-insensitive unless quoted.

  `SELECT firstName FROM users;  -- Works without quotes`

  If using quotes:

  `SELECT "FirstName" FROM users;  -- Case-sensitive`

- **MySQL**:
  Column names are case-insensitive by default on Windows but case-sensitive on Linux depending on the underlying file system.

  `SELECT firstName FROM users;  -- Works, case insensitivity`

## 4. LIMIT/OFFSET

- **PostgreSQL**:
  Use `LIMIT` and `OFFSET` to limit results and offset rows.

  `SELECT * FROM users LIMIT 10 OFFSET 20;`

- **MySQL**:
  Use `LIMIT` with two parameters (the number of rows and the offset).

  `SELECT * FROM users LIMIT 20, 10;`

## 5. String Comparison

- **PostgreSQL**:
  Use `ILIKE` for case-insensitive string matching.

  `SELECT * FROM users WHERE name ILIKE 'john%';`

- **MySQL**:
  Use `COLLATE` to specify case-insensitive comparison.

  `SELECT * FROM users WHERE name LIKE 'john%' COLLATE utf8_general_ci;`

## 6. Data Types

- **PostgreSQL**:
  Supports a wide variety of advanced data types, such as `ARRAY`, `JSON`, `HSTORE`, etc.

  `CREATE TABLE products ( id SERIAL PRIMARY KEY, tags TEXT[] );`

- **MySQL**:
  Does not support as many advanced data types, but supports `JSON` starting from version 5.7.

  `CREATE TABLE products ( id INT AUTO_INCREMENT PRIMARY KEY, tags JSON );`

## 7. Transactions

- **PostgreSQL**:
  Supports `SAVEPOINT` and nested transactions.

  `BEGIN; SAVEPOINT sp1; COMMIT;`

- **MySQL**:
  Does not support true nested transactions, but can use `SAVEPOINT` as a form of partial transaction control.

  `START TRANSACTION; SAVEPOINT sp1; COMMIT;`

## 8. Upsert (Insert or Update)

- **PostgreSQL**:
  Use `ON CONFLICT` for upserts.

  `INSERT INTO users (id, name) VALUES (1, 'John') ON CONFLICT (id) DO UPDATE SET name = 'John Updated';`

- **MySQL**:
  Use `ON DUPLICATE KEY UPDATE` for upserts.

  `INSERT INTO users (id, name) VALUES (1, 'John') ON DUPLICATE KEY UPDATE name = 'John Updated';`

## 9. Subqueries in `FROM` Clause

- **PostgreSQL**:
  Subqueries in the `FROM` clause are allowed.

  `SELECT subquery.* FROM (SELECT * FROM users) subquery;`

- **MySQL**:
  MySQL supports subqueries but may not support all forms (such as in `JOIN` clauses in some versions).

  `SELECT subquery.* FROM (SELECT * FROM users) subquery;`

## 10. Indexes

- **PostgreSQL**:
  Index types can be chosen explicitly, such as `btree`, `hash`, etc.

  `CREATE INDEX idx_name ON users USING btree (name);`

- **MySQL**:
  Index types can also be specified but are more limited in comparison.

  `CREATE INDEX idx_name ON users (name);`

## 11. Functions and Procedures

- **PostgreSQL**:
  Supports functions and procedures written in various languages like PL/pgSQL, PL/Tcl, and PL/Python.

  `CREATE FUNCTION add_numbers(a INT, b INT) RETURNS INT AS $$ BEGIN RETURN a + b; END; $$ LANGUAGE plpgsql;`

- **MySQL**:
  Functions and procedures are written in SQL or external languages.

  `DELIMITER $$ CREATE PROCEDURE add_numbers(a INT, b INT) BEGIN SELECT a + b; END$$ DELIMITER ;`

## 12. JSON Handling

- **PostgreSQL**:
  Supports JSON with the `json` and `jsonb` types, allowing for complex querying.

  `SELECT data->>'name' FROM users WHERE data->>'city' = 'New York';`

- **MySQL**:
  Supports the `JSON` type and provides JSON functions for querying.

  `SELECT JSON_EXTRACT(data, '$.name') FROM users WHERE JSON_EXTRACT(data, '$.city') = 'New York';`

## Conclusion

While both PostgreSQL and MySQL are popular relational databases, they have distinct features and syntax differences. PostgreSQL tends to have more advanced features and flexibility, while MySQL is known for its simplicity and speed.
