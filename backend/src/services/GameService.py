import uuid
import random

from src.database.mySQL import connectMySQL

from src.models.Game import Game
from src.models.Player import Player
from src.models.Cards import Card
from src.models.slabs import Slab, SpecialSlab, Risk

from src.utils.json import toJSON, fromJSON

from src.utils.config import (
  MISSION_TYPE_WOLFS,
)

class GameService():
  def createGame(
    gameType = MISSION_TYPE_WOLFS,
    playerConfig = None,
  ):

    game = Game(
      gameType=gameType,
      players=playerConfig
    )

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

    return game

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
      normalMarket = fromJSON(normalMarket)
      specialMarket = fromJSON(specialMarket)
      players = fromJSON(players)
      cards = fromJSON(cards)

      for slab in slabs:
        print(slab)
        if (slab.isRisk):
          slab = Risk()

      game = Game(
        id,
        gameType,
        riskNumber,
        nextBotAction,
        actualPlayer,
        whereIsPilar,
        finished,
      )

      print(toJSON(game))
      return toJSON(game)
    except Exception as error:
      print(error)