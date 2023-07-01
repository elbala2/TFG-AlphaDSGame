drop table tfg.games;

create table tfg.Games (
  gameId int primary key not null AUTO_INCREMENT,
  gameState blob,
  PRIMARY KEY (gameId)
)
AUTO_INCREMENT = 1;

select * from tfg.Games;