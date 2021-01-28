CREATE TABLE users (
	id  VARCHAR(255) NOT NULL,
  email  varchar(255) NOT NULL,
  password_hash  varchar(255) NOT NULL
);

alter table users owner to postgres;

CREATE TABLE projects
(
	id VARCHAR(255) NOT NULL,
  user_id  VARCHAR(255) NOT NULL,
  owner varchar,
  name varchar,
  url varchar,
  stars integer,
  forks integer,
  issues integer,
  create_date date
);

alter table projects owner to postgres;