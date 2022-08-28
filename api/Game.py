import json
import random

from Cards import *
from slabs import *
from Player import *

def genCards():
  res = []
  for i in range(4):
    res += [Card(['Mathematics', 'Fast Model']),
            Card(['Mathematics', 'Simple Model']),
            Card(['Mathematics', 'Right Model']),
            Card(['Computer Science', 'New Technology']),
            Card(['Computer Science', 'Antivirus']),
            Card(['Computer Science', 'Open Source']),
            Card(['Domain', 'Data Base']),
            Card(['Domain', 'Protected Data']),
            Card(['Domain', 'Team Spirit'])]
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
  + [SpecialYellow(i) for i in range(3)] \
    \
  + [Risk('Complex Model', 'Use Simple Model to fix the risk', 2),
    Risk('Danger Data', 'Use Protected Data to fix the risk', 1),
    Risk('No Data', 'Use Data Base to fix the risk', 2),
    Risk('Old Software', 'Use Open Source to fix the risk', 1),
    Risk('Old Technology', 'Use New Technology to fix the risk', 2),
    Risk('Slow Model', 'Use Fast Model to fix the risk', 1),
    Risk('Virus', 'Use Antivirus to fix the risk', 2),
    Risk('Working Alone', 'Use Team Spirit to fix the risk', 1),
    Risk('Wrong Model', 'Use Right Model to fix the risk', 2)]
  
  random.shuffle(res)
  return res

class Game:
  def __init__(self, start = 1):
    self.cards = genCards()
    self.slabs = genSlabs()
    self.normalMarket = []
    self.specialMarket = []
    while(len(self.normalMarket) < 4):
      item = self.slabs.pop(0)
      if not item.isSpecial:
        self.normalMarket.append(item)
      elif len(self.specialMarket) == 4:
        self.slabs.append(item)
      else:
        self.specialMarket.append(item)
    self.players = []
    for i in range(4):
      cards = []
      for i in range(4):
        cards.append(self.cards.pop(0))
      self.players.append(Player(i, 'Player '+ str(i), start, cards))
    self.actualPlayer = 0
    self.start = start
    self.pos = [start, 0, 0]
    self.finished = False
    
  def setConfig(self, players, start):
    self.start = start
    self.pos = [start, 0, 0]
    for i in range(4):
      self.players[i] = Player(i, players[i]['name'], start, self.players[i].cards, players[i]['type'])
    
  def nextTurn(self):
    if (self.actualplayer == 3):
      auxPos = self.pos
      if (pos[0] == 0 and pos[1] == 2):
        self.players[auxPos[2]].board[self.start][0].isHere = True
        auxPos = [self.start, 0, auxPos[2] + 1]
        self.finished = auxPos[2] == 4
      else:
        mov = self.players[auxPos[2]].whereCanBePlace(
          self.players[pos[2]].board[pos[0]][pos[1]],
          [pos[0], pos[1]],
          True,
        )
        if(mov == 1):
          auxPos = [pos[0] - 1, pos[1], pos[2]];
          players[pos[2]].tablero[pos[0]][pos[1]].wasHere = True;
        elif(mov == 2):
          auxPos = [pos[0], pos[1] + 1, pos[2]];
          players[pos[2]].tablero[pos[0]][pos[1]].wasHere = True;
        elif(mov == 3):
          auxPos = [pos[0] + 1, pos[1], pos[2]];
          players[pos[2]].tablero[pos[0]][pos[1]].wasHere = True;
        elif(mov == 4):
          auxPos = [pos[0], pos[1] - 1, pos[2]];
          players[pos[2]].tablero[pos[0]][pos[1]].wasHere = True;

    for player in self.players:
      self.cards += player.cards
      player.cards = [];
      player.hasBougth = False;
      for i in range(4):
        player.cards += cartasGenerales.pop(0);

    self.slabs += self.normalMarket
    self.normalMarket = []

    while (len(self.normalMarket) < 4):
      slab = self.slabs.pop(0)
      if (not slab.isSpecial):
        self.normalMarket += slab
      elif (self.specialMarket.length < 4):
        self.specialMarket += slab
      else:
        self.slabs += slab
    self.actualPlayer = self.actualPlayer + 1 % 4
    
  def moveSlab(self, origin, destiny, cards):
    if (origin > 3):
      market = self.normalMarket
      realOrigin = origin
    else:
      market = self.specialMarket
      realOrigin = origin - 4
    slab = self.specialMarket[realOrigin]
    player = self.players[self.actualPlayer]
    self.cards.append(player.buy(slab, cards))
    player.putSlab(slab, destiny)
    self.slabs.append(market.pop(realOrigin))
    
  def tradeCards(self, player1ID, cards1, player2ID, cards2):
    if (len(cards1) != len(cards2)):
      raise Exception('The trade must be equivalent')
    
    for i in range(4):
      if (len(self.players[player1ID].cards) > i):
        for j in range(len(cards1)):
          if (self.players[player1ID].cards[i].id == cards1[j].id):
            self.players[player1ID].cards.pop(i)
          if (self.players[player2ID].cards[i].id == cards2[j].id):
            self.players[player2ID].cards.pop(i)

    self.players[player1ID].cards.append(cards2)
    self.players[player2ID].cards.append(cards1)
    
  def toJSON(self):
    return json.loads(json.dumps(self, default=lambda o: getattr(o, '__dict__', str(o))))