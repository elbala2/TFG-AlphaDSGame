drop database if EXISTS tfg;
create database tfg;

drop table if EXISTS tfg.cards;
create table tfg.cards (
  id VARCHAR(32) primary key not null,
  type ENUM('domain', 'compSci', 'math') not NULL,
  subType ENUM(
    'protData',
    'dataBase',
    'teamSpirit',
    'openSource',
    'antivirus',
    'newTech',
    'simpModel',
    'fastModel',
    'rightModel'
    ) NOT NULL
);

select * from tfg.cards;



drop table if EXISTS tfg.games;
create table tfg.Games (
  id VARCHAR(40) primary key not null,
  type VARCHAR(40) not NULL,
  riskNumber int not NULL,
  nextBotAction int not NULL,
  actualPlayer VARCHAR(40) not NULL,
  whereIsPilar VARCHAR(40) not NULL,
  finished BOOLEAN not NULL,
  slabs JSON not NULL,
  normalMarket JSON not NULL,
  specialMarket JSON not NULL,
  players JSON not NULL,
  cards JSON not NULL
);

select * from tfg.Games;
