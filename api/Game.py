import json
import random

from Cards import *
from slabs import *
from Player import *
from utils import *

def toJSON(obj):
  return json.loads(json.dumps(obj, default=lambda o: getattr(o, '__dict__', str(o))))

def genCards():
  res = []
  for i in range(4):
    res = res + [Card(1 + (9 * i), False, ['Mathematics', 'Fast Model']),
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
  + [NormalSlab([0, 1, 0, 1]) for i in range(6)] \
  + [NormalSlab([1, 1, 1, 1]) for i in range(6)] \
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
    
  risk = [Risk('Complex Model', 'Use Simple Model to fix the risk', 2),
    Risk('Danger Data', 'Use Protected Data to fix the risk', 1),
    Risk('No Data', 'Use Data Base to fix the risk', 2),
    Risk('Old Software', 'Use Open Source to fix the risk', 1),
    Risk('Old Technology', 'Use New Technology to fix the risk', 2),
    Risk('Slow Model', 'Use Fast Model to fix the risk', 1),
    Risk('Virus', 'Use Antivirus to fix the risk', 2),
    Risk('Working Alone', 'Use Team Spirit to fix the risk', 1),
    Risk('Wrong Model', 'Use Right Model to fix the risk', 2)]
  
  random.shuffle(risk)
  res += risk[:4]
  random.shuffle(res)
  return res

class Game:
  def __init__(self, id, start = 1):
    self.id = id
    self.cards = genCards()
    self.slabs = genSlabs()
    self.normalMarket = []
    self.specialMarket = []
    self.hasRisk = 0
    while(len(self.normalMarket) < 4):
      item = self.slabs.pop(0)
      if not item.isSpecial:
        if item.isRisk:
          self.hasRisk += 1
        self.normalMarket.append(item)
      elif len(self.specialMarket) == 4:
        self.slabs.append(item)
      else:
        self.specialMarket.append(item)
    self.players = []
    for i in range(4):
      cards = []
      for j in range(4):
        cards.append(self.cards.pop(0))
      self.players.append(Player(i, 'Player '+ str(i + 1), start, cards))
    self.actualPlayer = 0
    self.start = start
    self.pos = [start, 0, 0]
    self.finished = False
    
  def getActualPlayer(self):
    return self.players[self.actualPlayer]
    
  def setConfig(self, players, start):
    self.start = start
    self.pos = [start, 0, 0]
    for i in range(4):
      name, type = players[i].values()
      cards = self.cards[:4]
      self.cards = self.cards[4:]
      self.players[i] = Player(i, name, start, cards, type)
    
  def nextTurn(self):
    if (self.actualPlayer == 3):
      if (self.pos[0] == 0 and self.pos[1] == 2):
        self.players[self.pos[2]].board[self.start][0].isHere = True
        self.finished = self.pos[2] == 4
        self.pos = [self.start, 0, self.pos[2] + 1]
      else:
        mov = self.players[self.pos[2]].whereCanBePlace(
          self.players[self.pos[2]].board[self.pos[0]][self.pos[1]],
          [self.pos[0], self.pos[1]],
          True,
        )[0]
        if(mov == 1):
          self.players[self.pos[2]].board[self.pos[0]][self.pos[1]].wasHere = True
          self.pos = [self.pos[0] - 1, self.pos[1], self.pos[2]]
        elif(mov == 2):
          self.players[self.pos[2]].board[self.pos[0]][self.pos[1]].wasHere = True
          self.pos = [self.pos[0], self.pos[1] + 1, self.pos[2]]
        elif(mov == 3):
          self.players[self.pos[2]].board[self.pos[0]][self.pos[1]].wasHere = True
          self.pos = [self.pos[0] + 1, self.pos[1], self.pos[2]]
        elif(mov == 4):
          self.players[self.pos[2]].board[self.pos[0]][self.pos[1]].wasHere = True
          self.pos = [self.pos[0], self.pos[1] - 1, self.pos[2]]

      for i in range(len(self.players)):
        self.cards += self.players[i].cards
        self.players[i].cards = []
        self.players[i].hasBougth = False
        x = 4 - len(self.players.cards)
        self.cards = self.cards[x:]
        self.players[i].cards += self.cards[:x]

      self.slabs += self.normalMarket
      self.normalMarket = []

      while (len(self.normalMarket) < 4):
        slab = self.slabs.pop(0)
        if (not slab.isSpecial):
          self.normalMarket.append(slab)
        elif (len(self.specialMarket) < 4):
          self.specialMarket.append(slab)
        else:
          self.slabs.append(slab)
    self.actualPlayer = (self.actualPlayer + 1) % 4
    
  def moveSlab(self, origin, destiny, rotation, cards):
    if (origin < 4):
      market = self.normalMarket
      realOrigin = origin
    else:
      market = self.specialMarket
      realOrigin = origin - 4
  
    slab = market[realOrigin]
    slab.rotation = rotation
    player = self.getActualPlayer()
    self.cards.append(player.buy(slab, cards))
    player.putSlab(slab, destiny)
    self.slabs.append(market.pop(realOrigin))
    
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

  def discard(self, cardID):
    index = findById(self.getActualPlayer().cards, cardID)
    if (index != -1):
      self.cards.append(self.getActualPlayer().cards.pop(index))

  def resolveRisks_bots(self):
    bots.resolveRisks()

  def buyPlaceSlab_bots(self):
    bots.buyPlaceSlab()

  def computeCards_bots(self):
    bots.computeCards()

  def toJSON(self):
    return toJSON(self)
  