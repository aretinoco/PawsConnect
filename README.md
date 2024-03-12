<!-- To start server: node index.js -->

Database Tables:
drop database if exists pawsconnect; 
create database pawsconnect;
use pawsconnect;

CREATE TABLE users (
    username VARCHAR(64) PRIMARY KEY,
    displayname VARCHAR(64),
    email VARCHAR(64),
    password VARCHAR(64),
    picture VARCHAR(255),
    location VARCHAR(64),
    language VARCHAR(64)
);

CREATE TABLE pets(
name	varchar(64),
species	varchar(64),
breed	varchar(64),
age		int,			
gender	tinyint(1),
color	varchar(64),
picture	varchar(64),
description	text, 
owner varchar(64)
)
