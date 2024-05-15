drop database if EXISTS tfg;
create database tfg;

drop table if EXISTS tfg.games;
create table tfg.games (
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

select * from tfg.games;
