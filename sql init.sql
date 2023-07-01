drop database tfg;

create database tfg;

drop table tfg.games;

create table tfg.Games (
  gameId int primary key not null AUTO_INCREMENT,
  gameState blob
);

ALTER TABLE tfg.Games AUTO_INCREMENT = 1;

select * from tfg.Games;