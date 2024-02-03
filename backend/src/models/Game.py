import uuid

import random
import copy

from src.models.Cards import Card
from src.models.slabs import *
from src.models.Player import Player
from src.models.bots import Bot

from src.utils.utils import findIndex, findIndexById, findById
from src.utils.GameConfig import (
  playerColors,
  MISSION_TYPE_WOLFS,
  cardTypes,
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
  + [Slab(links=[1, 1, 1, 1]) for _ in range(6)] \
  + [Slab(links=[0, 1, 0, 1]) for _ in range(6)] \
  + [Slab(links=[0, 1, 1, 0]) for _ in range(12)] \
  + [Slab(links=[1, 0, 1, 1]) for _ in range(14)] \
    \
  + [Slab(links=[0, 1, 0, 1], slabType=GOLD),
    Slab(links=[1, 1, 1, 1], slabType=GOLD),
    Slab(links=[0, 1, 1, 0], slabType=GOLD),
    Slab(links=[1, 0, 1, 1], slabType=GOLD)] \
    \
  + [Slab(links=[0, 1, 0, 1], slabType=SILVER),
    Slab(links=[1, 1, 1, 1], slabType=SILVER),
    Slab(links=[0, 1, 1, 0], slabType=SILVER),
    Slab(links=[1, 0, 1, 1], slabType=SILVER)]
  
  for type in specialSlabs.keys():
    slabConfig = specialSlabs[type]
    for i in range(len(specialSlabs[type][TITLE_KEYS])):
      res += [SpecialSlab(
        slabType=type,
        title=slabConfig[TITLE_KEYS][i],
        descriptionKey=slabConfig[DESCRIPTION_KEYS][i],
        costs=slabConfig['costs'][i],
      )]
    
  risk = [Risk(riskType=key) for key in risksKeys.keys()]
  
  random.shuffle(risk)
  res += risk[:4]
  random.shuffle(res)
  return res

class Game():
  def __init__(self,
    gameId = None,
    gameType = MISSION_TYPE_WOLFS,
    riskNumber = 0,
    nextBotAction = 0,
    actualPlayer = None,
    whereIsPilar = None,
    finished = False,
    slabs = None,
    cards = None,
    normalMarket = None,
    specialMarket = None,
    players = None,
  ):
    if (gameId == None):
      self.createGame(gameType, players)
      return

    self.id = gameId
    self.type = gameType
    self.riskNumber = riskNumber
    self.nextBotAction = nextBotAction
    self.actualPlayer = actualPlayer
    self.whereIsPilar = whereIsPilar
    self.finished = finished
    self.slabs = slabs
    self.normalMarket = normalMarket
    self.specialMarket = specialMarket
    self.players = players
    self.cards = cards

  def createGame(self, gameType, playerConfig):
    gameId = uuid.uuid4().__str__()
    riskNumber = 0
    nextBotAction = 0
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
      players.append(
        Player(
          name=name,
          color=playerColors[i],
          cards=playerCards,
          playerType=playertype,
        )
      )
      if i == 0:
        players[i].startWay()
        actualPlayer = players[i].id
    cards = cards[16:]

    self.id = gameId
    self.type = gameType
    self.riskNumber = riskNumber
    self.nextBotAction = nextBotAction
    self.actualPlayer = actualPlayer
    self.whereIsPilar = actualPlayer
    self.finished = finished
    self.slabs = slabs
    self.normalMarket = normalMarket
    self.specialMarket = specialMarket
    self.players = players
    self.cards = cards
    
  def getActualPlayer(self):
    return findById(self.players, self.actualPlayer)
  
  def getPilarPlayer(self):
    return findById(self.players, self.whereIsPilar)


  def distributeCards(self):
    for player in self.players:
      player.hasBought = False
      x = 4 - len(player.cards)
      self.cards = self.cards[x:]
      player.cards += self.cards[:x]

  def distributeSlabs(self):
    self.slabs += self.normalMarket
    self.normalMarket = []
    while (len(self.normalMarket) < 4):
      slab = self.slabs.pop(0)
      if (not slab.isSpecial):
        self.normalMarket.append(slab)
      elif (len(self.specialMarket) < 4):
        if slab.isRisk:
          self.riskNumber += 1
        self.specialMarket.append(slab)
      else:
        self.slabs.append(slab)

  def nextTurn(self):
    self.nextBotAction = 0
    pIndex = findIndexById(self.players, self.actualPlayer)
      
    if (pIndex == len(self.players) - 1):
      self.actualPlayer = self.players[0].id
    else:
      self.actualPlayer = self.players[pIndex + 1].id

    if (pIndex == 3):
      self.startRound()
    
    return True
  
  def startRound(self):
    pIndex = findIndexById(self.players, self.whereIsPilar)
    
    if (self.players[pIndex].moveWay()):
      if pIndex + 1 == len(self.players):
        self.finished = True
        return

      self.whereIsPilar = self.players[pIndex + 1].id
      self.players[pIndex + 1].startWay()

    self.distributeCards()
    self.distributeSlabs()
    
    
  def moveSlab(self, slabId, destiny, rotation, cards):
    player = self.getActualPlayer()
    if player.hasBought:
      return False
    
    market = self.normalMarket
    realOrigin = findIndexById(self.normalMarket, slabId)
    if realOrigin == -1:
      market = self.specialMarket
      realOrigin = findIndexById(self.specialMarket, slabId)

      if realOrigin == -1:
        raise Exception('Slab not found')
  
    slab = market[realOrigin]
    newSlab = copy.deepcopy(slab)
    newSlab.reEvaluateId()
    playerCards = player.buy(slab, cards)
    if player.putSlab(slab, destiny, rotation):
      self.cards += playerCards
      market.pop(realOrigin)
      if not newSlab.isSpecial:
        self.slabs.append(newSlab)
      return True
    else:
      player.cards += playerCards
      return False
    
  def tradeCards(self, player1ID, cards1, player2ID, cards2):
    if (len(cards1) != len(cards2)):
      raise Exception('The trade must be equivalent')
    
    p1 = findById(self.players, player1ID)
    p2 = findById(self.players, player2ID)

    for i in range(len(cards1)):
      index1 = findIndex(p1.cards, cards1[i])
      if (index1 != -1):
        p2.cards.append(p1.cards.pop(index1))
        
      index2 = findIndex(p2.cards, cards2[i])
      if (index2 != -1):
        p1.cards.append(p2.cards.pop(index2))

  def fix(self, riskId, cards):
    player = self.getActualPlayer()
    rIndex = findIndexById(self.specialMarket, riskId)
    risk = self.specialMarket[rIndex]
    if not risk.isRisk:
      return
    for i in range(len(cards)):
      cIndex = findIndex(player.cards, cards[i])
      if (cIndex != -1):
        self.cards.append(player.cards.pop(cIndex))

    player.hasBought = True
    player.points += risk.points
    self.specialMarket.pop(rIndex)
    self.riskNumber -= 1

  def discard(self, cardID):
    player = self.getActualPlayer()
    cIndex = findIndexById(player.cards, cardID)
    if (cIndex != -1):
      self.cards.append(player.cards.pop(cIndex))

  def botAction(self):
    done = False
    bot = Bot(self)
    actions = [
      bot.trade,
      bot.resolveRisks,
      bot.buyPlaceSlab,
      bot.computeCards,
      self.nextTurn,
    ]
    for botActionIndex in range(self.nextBotAction, len(actions)):
      done = actions[botActionIndex]()
      if done != False:
        self.nextBotAction = (botActionIndex + 1) % 5
        break
    return done

  def canRiskBeSolved(self, risk):
    cost = risk.costs
    for player in self.players:
      for card in player.cards:
        if cost != 0 and risk.costIndexNeeded(card) != -1:
          cost -= 1
          if cost == 0:
            return True
    return False

  def canSlabBeBought(self, slab):

    costs = slab.costs.copy()
    cardTypesKeys = list(cardTypes.keys())
    for player in self.players:
      for card in player.cards:
        for i in range(len(cardTypesKeys)):
          if costs[i] != 0 and card.type == cardTypesKeys[i]:
            costs[i] -= 1
          if sum(costs) == 0:
            return True
    return False
