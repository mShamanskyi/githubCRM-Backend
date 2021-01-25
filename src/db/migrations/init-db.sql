CREATE DATABASE IF NOT EXISTS githubCRM;
USE githubCRM;

create table if not exists user
(
	user_id serial not null
		constraint user_pk
			primary key,
  email varchar,
  password varchar
);

alter table users owner to postgres;

create table if not exists project
(
	project_id serial not null
		constraint project_pk
			primary key,
  user_id integer
		constraint project_user_user_id_fk
      references user,
  owner varchar,
  name varchar,
  url varchar,
  stars integer,
  forks integer,
  issues integer,
  create_date date
);