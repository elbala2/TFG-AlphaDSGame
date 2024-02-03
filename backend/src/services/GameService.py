from src.database.mySQL import connectMySQL

from src.models.Game import Game
from src.models.Player import dictToPlayer
from src.models.Cards import dictToCard
from src.models.slabs import dictToSlab

from src.utils.json import toJSON, fromJSON

from src.utils.GameConfig import (
  MISSION_TYPE_WOLFS,
)

class GameService():
  def storeGame(game):
    try:
      connection = connectMySQL()
      cursor = connection.cursor(buffered = True)
      cursor.execute(
        'insert into tfg.Games values (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);',
        [
          game.id,
          game.type,
          game.riskNumber,
          game.nextBotAction,
          game.actualPlayer,
          game.whereIsPilar,
          game.finished,
          '\"' + toJSON(game.slabs).replace('"', '\\"') + '\"',
          '\"' + toJSON(game.normalMarket).replace('"', '\\"') + '\"',
          '\"' + toJSON(game.specialMarket).replace('"', '\\"') + '\"',
          '\"' + toJSON(game.players).replace('"', '\\"') + '\"',
          '\"' + toJSON(game.cards).replace('"', '\\"') + '\"',
        ]
      )
      connection.commit()
    except Exception as error:
      print(error)
      return False

    return True

  def getGame(gameId):
    try:
      connection = connectMySQL()
      cursor = connection.cursor(buffered = True)
      cursor.execute("select * from tfg.games where id = %s ;", [gameId])
      connection.commit()
      id, \
      gameType, \
      riskNumber, \
      nextBotAction, \
      actualPlayer, \
      whereIsPilar, \
      finished, \
      slabs, \
      normalMarket, \
      specialMarket, \
      players, \
      cards = cursor.fetchall()[0]

      slabs = fromJSON(fromJSON(slabs))
      normalMarket = fromJSON(fromJSON(normalMarket))
      specialMarket = fromJSON(fromJSON(specialMarket))
      cards = fromJSON(fromJSON(cards))
      players = fromJSON(fromJSON(players))

      game = Game(
        gameId = id,
        gameType = gameType,
        riskNumber = riskNumber,
        nextBotAction = nextBotAction,
        actualPlayer = actualPlayer,
        whereIsPilar = whereIsPilar,
        finished = finished,
        slabs = [dictToSlab(s) for s in slabs],
        normalMarket = [dictToSlab(s) for s in normalMarket],
        specialMarket = [dictToSlab(s) for s in specialMarket],
        cards = [dictToCard(c) for c in cards],
        players = [dictToPlayer(p) for p in players]
      )

      return game
    except Exception as error:
      print(error)

  def updateGame(game):
    try:
      connection = connectMySQL()
      cursor = connection.cursor(buffered = True)
      cursor.execute(
        '''
          update tfg.games set
            type = %s,
            riskNumber = %s,
            nextBotAction = %s,
            actualPlayer = %s,
            whereIsPilar = %s,
            finished = %s,
            slabs = %s,
            normalMarket = %s,
            specialMarket = %s,
            players = %s,
            cards = %s
          where id = %s;
        ''',
        [
          game.type,
          game.riskNumber,
          game.nextBotAction,
          game.actualPlayer,
          game.whereIsPilar,
          game.finished,
          '\"' + toJSON(game.slabs).replace('"', '\\"') + '\"',
          '\"' + toJSON(game.normalMarket).replace('"', '\\"') + '\"',
          '\"' + toJSON(game.specialMarket).replace('"', '\\"') + '\"',
          '\"' + toJSON(game.players).replace('"', '\\"') + '\"',
          '\"' + toJSON(game.cards).replace('"', '\\"') + '\"',
          game.id,
        ]
      )
      connection.commit()
    except Exception as error:
      print(error)

    return game