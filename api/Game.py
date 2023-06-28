import random
import copy

from Cards import *
from slabs import *
from Player import *
from utils import *
from bots import *

def genCards():
  res = []
  for i in range(4):
    res += [Card(1 + (9 * i), False, ['Mathematics', 'Fast Model']),
            Card(2 + (9 * i), False, ['Mathematics', 'Simple Model']),
            Card(3 + (9 * i), False, ['Mathematics', 'Right Model']),
            Card(4 + (9 * i), False, ['Computer Science', 'New Technology']),
            Card(5 + (9 * i), False, ['Computer Science', 'Antivirus']),
            Card(6 + (9 * i), False, ['Computer Science', 'Open Source']),
            Card(7 + (9 * i), False, ['Domain', 'Data Base']),
            Card(8 + (9 * i), False, ['Domain', 'Protected Data']),
            Card(9 + (9 * i), False, ['Domain', 'Team Spirit'])]
  random.shuffle(res);
  return res

def genSlabs():
  res = [] \
  + [NormalSlab([1, 1, 1, 1]) for i in range(6)] \
  + [NormalSlab([0, 1, 0, 1]) for i in range(6)] \
  + [NormalSlab([0, 1, 1, 0]) for i in range(12)] \
  + [NormalSlab([1, 0, 1, 1]) for i in range(14)] \
    \
  + [GoldSlab([0, 1, 0, 1]),
  GoldSlab([1, 1, 1, 1]),
  GoldSlab([0, 1, 1, 0]),
  GoldSlab([1, 0, 1, 1])] \
    \
  + [SilverSlab([0, 1, 0, 1]),
  SilverSlab([1, 1, 1, 1]),
  SilverSlab([0, 1, 1, 0]),
  SilverSlab([1, 0, 1, 1])] \
    \
  + [SpecialRed(i) for i in range(3)] \
  + [SpecialBlue(i) for i in range(3)] \
  + [SpecialGreen(i) for i in range(3)] \
  + [SpecialYellow(i) for i in range(3)]
    
  risk = [Risk(0, 'Complex Model', 'Use Simple Model to fix the risk', 2),
    Risk(1, 'Danger Data', 'Use Protected Data to fix the risk', 1),
    Risk(2, 'No Data', 'Use Data Base to fix the risk', 2),
    Risk(3, 'Old Software', 'Use Open Source to fix the risk', 1),
    Risk(4, 'Old Technology', 'Use New Technology to fix the risk', 2),
    Risk(5, 'Slow Model', 'Use Fast Model to fix the risk', 1),
    Risk(6, 'Virus', 'Use Antivirus to fix the risk', 2),
    Risk(7, 'Working Alone', 'Use Team Spirit to fix the risk', 1),
    Risk(8, 'Wrong Model', 'Use Right Model to fix the risk', 2)]
  
  random.shuffle(risk)
  res += risk[:4]
  random.shuffle(res)
  return res

colors = ['RED', 'GREEN', 'BLUE', 'YELLOW']

class Game():
  def __init__(self, id, start = 1):
    self.id = id
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
      self.players.append(Player(i, 'Player '+ str(i + 1), start, cards, colors[i], 1))
      if i == 0:
        self.players[i].startWay()
    self.cards = self.cards[16:]
    self.actualPlayer = 0
    self.start = start
    self.whereIsPilar = 0
    self.finished = False
    self.bot = Bot()
    
  def getActualPlayer(self):
    return self.players[self.actualPlayer]
    
  def setConfig(self, players, start):
    self.start = start
    self.pos = [start, 0, 0]
    for i in range(4):
      name, type = players[i].values()
      self.players[i] = Player(i, name, 1, self.players[i].cards, colors[i], type)
      if i == 0:
        self.players[i].startWay()


  def nextTurn(self):
    if (self.actualPlayer == 3):
      if (self.players[self.whereIsPilar].moveWay()):
        self.whereIsPilar += 1
        if self.whereIsPilar > 3:
          self.finished = True
        else:
          self.players[self.whereIsPilar].startWay()

      for playerAux in self.players:
        self.cards += playerAux.cards
        playerAux.cards = []
        playerAux.hasBougth = False
        x = 4 - len(playerAux.cards)
        self.cards = self.cards[x:]
        playerAux.cards += self.cards[:x]

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
    self.actualPlayer = (self.actualPlayer + 1) % 4
    self.nextBotAction = 0
    return True
    
  def moveSlab(self, origin, destiny, rotation, cards):
    if (origin < 4):
      market = self.normalMarket
      realOrigin = origin
    else:
      market = self.specialMarket
      realOrigin = origin - 4
  
    slab = market[realOrigin]
    newslab = copy.deepcopy(slab)
    newslab.reCalculeId()
    player = self.getActualPlayer()
    self.cards += player.buy(slab, cards)
    if player.putSlab(slab, destiny, rotation):
      market.pop(realOrigin)
      if not newslab.isSpecial:
        self.slabs.append(newslab)
    
  def tradeCards(self, player1ID, cards1, player2ID, cards2):
    if (len(cards1) != len(cards2)):
      raise Exception('The trade must be equivalent')
    
    for i in range(len(cards1)):
      index1 = find(self.players[player1ID].cards, cards1[i])
      if (index1 != -1):
        self.players[player2ID].cards.append(self.players[player1ID].cards.pop(index1))
        
      index2 = find(self.players[player2ID].cards, cards2[i])
      if (index2 != -1):
        self.players[player1ID].cards.append(self.players[player2ID].cards.pop(index2))

  def fix(self, index, cards):
    player = self.getActualPlayer()
    for i in range(len(cards)):
      index1 = find(player.cards, cards[i])
      if (index1 != -1):
        self.cards.append(player.cards.pop(index1))
    self.specialMarket.pop(index)
    self.hasRisk -= 1

  def discard(self, cardID):
    index = findById(self.getActualPlayer().cards, cardID)
    if (index != -1):
      self.cards.append(self.getActualPlayer().cards.pop(index))

  def botAction(self):
    hecho = False
    actions = [
      self.bot.trade,
      self.bot.resolveRisks, # Funciona
      self.bot.buyPlaceSlab, # Funciona
      self.bot.computeCards,
      Game.nextTurn,
    ]
    actionLiterals = [
      'Trade',
      'Risk Resolve',
      'Move Slab',
      'Discard Cards',
      'Next Turn',
    ]
    for botActionIndex in range(self.nextBotAction, len(actions)):
      hecho = actions[botActionIndex](self)
      if hecho != False:
        print(actionLiterals[botActionIndex])
        self.nextBotAction = (botActionIndex + 1) % 5
        break
    return hecho

  def canRiskBeSolved(self, index):
    risk = self.specialMarket[index]

    cost = risk.costs
    for player in self.players:
      for card in player.cards:
        if cost != 0 and risk.isCardNeeded(card):
          cost -= 1
          if cost == 0:
            return True
    return False

  def canSlabBeBougth(self, index):
    if index > 3:
      slab = self.specialMarket[index - 4]
    else:
      slab = self.normalMarket[index]

    costs = slab.costs.copy()
    for player in self.players:
      for card in player.cards:
        if costs[0] != 0 and card.type[0] == 'Domain':
          costs[0] -= 1
        elif costs[1] != 0 and  card.type[0] == 'Computer Science':
          costs[1] -= 1
        elif costs[2] != 0 and  card.type[0] == 'Mathematics':
          costs[2] -= 1
        if costs[0] == 0 and costs[1] == 0 and costs[2] == 0:
          return True
    return False
