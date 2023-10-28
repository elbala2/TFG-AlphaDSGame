import random
import copy

from Cards import Card
from slabs import *
from Player import Player
from utils import findIndex, findById
from bots import Bot

from config import (
  playerColors,

  SILVER,
  GOLD,

  risksKeys,
  specialSlabs,
  TITLE_KEYS,
  DESCRIPTION_KEYS,

  cardTypes,
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

class Game():
  def __init__(self):
    self.id = 0
    self.cards = genCards()
    self.slabs = genSlabs()
    self.normalMarket = []
    self.specialMarket = []
    self.hasRisk = 0
    self.nextBotAction = 0
    while(len(self.normalMarket) < 4):
      item = self.slabs.pop(0)
      if not item.isSpecial:
        self.normalMarket.append(item)
      elif len(self.specialMarket) < 4:
        if item.isRisk:
          self.hasRisk += 1
        self.specialMarket.append(item)
      else:
        self.slabs.append(item)
    self.players = []
    for i in range(4):
      cards = self.cards[i * 4 : (i + 1) *4]
      self.players.append(Player(i, 'Player '+ str(i + 1), start, cards, playerColors[i], 0))
      if i == 0:
        self.players[i].startWay()
    self.cards = self.cards[16:]
    self.actualPlayer = 0
    self.start = 1
    self.whereIsPilar = 0
    self.finished = False
    self.bot = Bot()
    
  def getActualPlayer(self):
    return self.players[self.actualPlayer]
    
  def setConfig(self, players, start):
    self.start = start
    for i in range(4):
      name, type = players[i].values()
      self.players[i] = Player(i, name, 1, self.players[i].cards, playerColors[i], type)
      if i == 0:
        self.players[i].startWay()

  def distributeCards(self):
    for player in self.players:
      self.cards += player.cards
      player.cards = []
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
          self.hasRisk += 1
        self.specialMarket.append(slab)
      else:
        self.slabs.append(slab)

  def nextTurn(self):
    if (self.actualPlayer == 3):
      if (self.players[self.whereIsPilar].moveWay()):
        self.whereIsPilar += 1
        if self.whereIsPilar > 3:
          self.finished = True
        else:
          self.players[self.whereIsPilar].startWay()
  
      self.distributeCards()
      self.distributeSlabs()
      
    self.actualPlayer = (self.actualPlayer + 1) % 4
    self.nextBotAction = 0
    return True
    
  def moveSlab(self, origin, destiny, rotation, cards):
    player = self.getActualPlayer()
    if player.hasBought:
      return False
    if (origin < 4):
      market = self.normalMarket
      realOrigin = origin
    else:
      market = self.specialMarket
      realOrigin = origin - 4
  
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
    
    for i in range(len(cards1)):
      index1 = findIndex(self.players[player1ID].cards, cards1[i])
      if (index1 != -1):
        self.players[player2ID].cards.append(self.players[player1ID].cards.pop(index1))
        
      index2 = findIndex(self.players[player2ID].cards, cards2[i])
      if (index2 != -1):
        self.players[player1ID].cards.append(self.players[player2ID].cards.pop(index2))

  def fix(self, index, cards):
    player = self.getActualPlayer()
    risk = self.specialMarket[index]
    if not risk.isRisk:
      return
    for i in range(len(cards)):
      index1 = findIndex(player.cards, cards[i])
      if (index1 != -1):
        self.cards.append(player.cards.pop(index1))
    player.hasBought = True
    player.points += risk.points
    self.specialMarket.pop(index)
    self.hasRisk -= 1

  def discard(self, cardID):
    index = findById(self.getActualPlayer().cards, cardID)
    if (index != -1):
      self.cards.append(self.getActualPlayer().cards.pop(index))

  def botAction(self):
    done = False
    actions = [
      self.bot.trade,
      self.bot.resolveRisks,
      self.bot.buyPlaceSlab,
      self.bot.computeCards,
      Game.nextTurn,
    ]
    for botActionIndex in range(self.nextBotAction, len(actions)):
      done = actions[botActionIndex](self)
      if done != False:
        self.nextBotAction = (botActionIndex + 1) % 5
        break
    return done

  def canRiskBeSolved(self, index):
    risk = self.specialMarket[index]

    cost = risk.costs
    for player in self.players:
      for card in player.cards:
        if cost != 0 and risk.costIndexNeeded(card) != -1:
          cost -= 1
          if cost == 0:
            return True
    return False

  def canSlabBeBought(self, index):
    if index > 3:
      slab = self.specialMarket[index - 4]
    else:
      slab = self.normalMarket[index]

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
