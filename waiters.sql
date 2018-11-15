create table waiter(
	id serial not null primary key,
	username text not null
);

create table weekdays(
	id serial not null primary key,
	weekday text not null
);

create table shifts(
	id serial not null primary key
);