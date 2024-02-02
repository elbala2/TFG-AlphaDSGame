import uuid
import random

from src.database.mySQL import connectMySQL

from src.models.Game import Game
from src.models.Player import Player
from src.models.Cards import Card
from src.models.slabs import Slab, SpecialSlab, Risk

from src.utils.json import toJSON
from src.utils.config import (
  TITLE_KEYS,
  DESCRIPTION_KEYS,

  SILVER,
  GOLD,
  cardTypes,
  risksKeys,
  specialSlabs,
  playerColors,
)


def genCards():
  res = []
  for i in range(4):
    cardTypesKeys = list(cardTypes.keys())
    for cardType in cardTypesKeys:
      for subtype in cardTypes[cardType]:
        res += [Card(cardType, subtype)]
  random.shuffle(res);
  return res

def genSlabs():
  res = [] \
  + [Slab([1, 1, 1, 1]) for _ in range(6)] \
  + [Slab([0, 1, 0, 1]) for _ in range(6)] \
  + [Slab([0, 1, 1, 0]) for _ in range(12)] \
  + [Slab([1, 0, 1, 1]) for _ in range(14)] \
    \
  + [Slab([0, 1, 0, 1], GOLD),
    Slab([1, 1, 1, 1], GOLD),
    Slab([0, 1, 1, 0], GOLD),
    Slab([1, 0, 1, 1], GOLD)] \
    \
  + [Slab([0, 1, 0, 1], SILVER),
    Slab([1, 1, 1, 1], SILVER),
    Slab([0, 1, 1, 0], SILVER),
    Slab([1, 0, 1, 1], SILVER)]
  
  for type in specialSlabs.keys():
    slabConfig = specialSlabs[type]
    for i in range(len(specialSlabs[type][TITLE_KEYS])):
      res += [SpecialSlab(type, slabConfig[TITLE_KEYS][i], slabConfig[DESCRIPTION_KEYS][i], slabConfig['costs'][i])]
    
  risk = [Risk(key) for key in risksKeys.keys()]
  
  random.shuffle(risk)
  res += risk[:4]
  random.shuffle(res)
  return res


class GameService():
  def createGame(
    gameType,
    playerConfig = None,
  ):
    id = str(uuid.uuid4())
    riskNumber = 0
    nextBotAction = 0
    actualPlayer = 0
    whereIsPilar = 0
    finished = False
    slabs = genSlabs()
    cards = genCards()
    normalMarket = []
    specialMarket = []
    while(len(normalMarket) < 4):
      item = slabs.pop(0)
      if not item.isSpecial:
        normalMarket.append(item)
      elif len(specialMarket) < 4:
        if item.isRisk:
          riskNumber += 1
        specialMarket.append(item)
      else:
        slabs.append(item)

    players = []
    for i in range(4):
      name = 'Player '+ str(i + 1)
      playertype = 0
      if (playerConfig != None and len(playerConfig) != 0):
        name = playerConfig[i]['name']
        playertype = playerConfig[i]['type']
      playerCards = cards[i * 4 : (i + 1) *4]
      players.append(Player(i, name, playerCards, playerColors[i], playertype))
      if i == 0:
        players[i].startWay()
    cards = cards[16:]

    game = Game(
      id,
      gameType,
      riskNumber,
      nextBotAction,
      actualPlayer,
      whereIsPilar,
      finished,
      slabs,
      cards,
      normalMarket,
      specialMarket,
      players,
    )

    try:
      connection = connectMySQL()
      cursor = connection.cursor(buffered = True)
      cursor.execute(
        'insert into tfg.Games values (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);',
        [
          id,
          gameType,
          riskNumber,
          nextBotAction,
          actualPlayer,
          whereIsPilar,
          finished,
          '\"' + toJSON(slabs) + '\"',
          '\"' + toJSON(normalMarket) + '\"',
          '\"' + toJSON(specialMarket) + '\"',
          '\"' + toJSON(players) + '\"',
          '\"' + toJSON(cards) + '\"',
        ]
      )
      connection.commit()
    except Exception as error:
      print(error)


    return toJSON(game)

  def getGame(gameId):
    try:
      connection = connectMySQL()
      cursor = connection.cursor(buffered = True)
      cursor.execute("select gameState from tfg.games where gameId = %s ;", [gameId])
      connection.commit()
      data = cursor.fetchall()

      print(data)
    except Exception as error:
      print(error)