import json

from slabs import *
from utils import *

def toJSON(obj):
  return json.loads(json.dumps(obj, default=lambda o: getattr(o, '__dict__', str(o))))

class Player:
  def __init__(self, id, name, start, cards, type = 0):
    self.id = id
    self.name = name
    self.type = type
    self.points = 0
    self.cards = cards
    self.hasBougth = False
    self.board = [[None for i in range(4) ] for i in range(4)]
    self.start = start
    self.board[start][0] = Slab([1, 1, 1, 1], 'Start_' + str(id))
    if (id == 0):
      self.board[start][0].isHere = True
      
  def buy(self, slab, cards):
    costs = slab.costs

    if not self.canBuySlab(cards, costs):
      raise Exception('You cant buy this slab')

    i = len(cards) - 1;
    deletedCards = []
    while (i >= 0 and costs[0] + costs[1] + costs[2] > 0):
      index = indexOf(self.cards, cards[i])
      if index == -1:
        raise Exception('Card not found')
      type = cards[i].type
      if (costs[0] > 0 and type[0] == 'Domain'):
        deletedCards += [self.cards.pop(index)]
        costs[0] -= 1
      if (costs[1] > 0 and type[0] == 'Computer Science'):
        deletedCards += [self.cards.pop(index)]
        costs[1] -= 1
      if (costs[2] > 0 and type[0] == 'Mathematics'):
        deletedCards += [self.cards.pop(index)]
        costs[2] -= 1
      i -= 1
    return deletedCards
  
  def validPlaces(self):
    player = self.getActualPlayer()
    
    visitedList = []
    validList = []
    slabList = [[0, self.start, self.board[0][self.start]]]

    arriba = [0, 1]
    derecha = [1, 0]
    abajo = [0, -1]
    izquierda = [-1, 0]
    
    while len(slabList > 0):
      [x, y, slab] = slabList.pop(0)

    if (x == 2 and y == 0):
      validList.push([x, y])
      visitedList.push([x, y])
      
    #comprueba el de arriba del destino
    if (y + 1 >= 0):
      slabEnTablero = self.board[y+1][x];
      if (slabEnTablero != None):
        if ((slab.ApplyRotation()[arriba] and slabEnTablero.ApplyRotation()[abajo]) == 1 and hecho):
          return 1

    #comprueba el de la derecha del destino
    if (destiny[1] + 1 <= 3):
      slabEnTablero = self.board[destiny[0]][destiny[1] + 1];
      if (slabEnTablero != None and (not here or not slabEnTablero.wasHere)):
        if ((slab.ApplyRotation()[derecha] and slabEnTablero.ApplyRotation()[izquierda]) == 1 and hecho):
          return 2

    #comprueba el de abajo del destino
    if (destiny[0] + 1 <= 3):
      slabEnTablero = self.board[destiny[0] + 1][destiny[1]];
      if (slabEnTablero != None and (not here or not slabEnTablero.wasHere)):
        if ((slab.ApplyRotation()[abajo] and slabEnTablero.ApplyRotation()[arriba]) == 1 and hecho):
          return 3

    #comprueba el de la izquierda del destino
    if (destiny[1] - 1 >= 0):
      slabEnTablero = self.board[destiny[0]][destiny[1] - 1];
      if (slabEnTablero != None and (not here or not slabEnTablero.wasHere)):
        if ((slab.ApplyRotation()[izquierda] and slabEnTablero.ApplyRotation()[derecha]) == 1 and hecho):
          return 4
    return 0;
  
  def whereCanBePlace(self, slab, destiny, here = False):
    arriba = 0
    derecha = 1
    abajo = 2
    izquierda = 3

    hecho = True;
    if (destiny[0] == 0 and destiny[1] == 2):
      hecho = slab.ApplyRotation()[arriba] == 1

    #comprueba el de arriba del destino
    if (destiny[0] - 1 >= 0):
      slabEnTablero = self.board[destiny[0] - 1][destiny[1]];
      if (slabEnTablero != None and (not here or not slabEnTablero.wasHere)):
        if ((slab.ApplyRotation()[arriba] and slabEnTablero.ApplyRotation()[abajo]) == 1 and hecho):
          return 1

    #comprueba el de la derecha del destino
    if (destiny[1] + 1 <= 3):
      slabEnTablero = self.board[destiny[0]][destiny[1] + 1];
      if (slabEnTablero != None and (not here or not slabEnTablero.wasHere)):
        if ((slab.ApplyRotation()[derecha] and slabEnTablero.ApplyRotation()[izquierda]) == 1 and hecho):
          return 2

    #comprueba el de abajo del destino
    if (destiny[0] + 1 <= 3):
      slabEnTablero = self.board[destiny[0] + 1][destiny[1]];
      if (slabEnTablero != None and (not here or not slabEnTablero.wasHere)):
        if ((slab.ApplyRotation()[abajo] and slabEnTablero.ApplyRotation()[arriba]) == 1 and hecho):
          return 3

    #comprueba el de la izquierda del destino
    if (destiny[1] - 1 >= 0):
      slabEnTablero = self.board[destiny[0]][destiny[1] - 1];
      if (slabEnTablero != None and (not here or not slabEnTablero.wasHere)):
        if ((slab.ApplyRotation()[izquierda] and slabEnTablero.ApplyRotation()[derecha]) == 1 and hecho):
          return 4
    return 0;
      
  def putSlab(self, slab, destiny):
    if (destiny == None or self.board[destiny[0]][destiny[1]] != None):
      raise Exception('')

    if (self.whereCanBePlace(slab, destiny) == 0):
      raise Exception(
        'Posicion',
        destiny[0],
        destiny[1],
        'rotación',
        slab.rotation,
        self.whereCanBePlace(slab, destiny)
      );

    self.board[destiny[0]][destiny[1]] = slab
    if (destiny[0] == 0 and destiny[1] == 2):
      self.points += 10;
    self.points += slab.points;
    self.hasBougth = True
    
  def canBuySlab(self, cards = self.cards, costs):
    domainList = list(filter(lambda f: f.type[0] == 'Domain', cards))
    computerScienceList = list(filter(lambda f: f.type[0] == 'Domain', cards))
    mathematicsList = list(filter(lambda f: f.type[0] == 'Mathematics', cards))

    return len(domainList) >= costs[0] and len(computerScienceList) >= costs[1] and len(mathematicsList) >= costs[2]

  def canSolveRisk(self, cards = self.cards, risk): 
    solveTypeNeeded = getRiskFixCardType(risk.type)
    requiredCardsNeeded = list(filter(lambda f: f.type[1] == solveTypeNeeded, cards))
    return len(requiredCardsNeeded) > 0

  def toJSON(self):
    return json.loads(json.dumps(self, default=lambda o: getattr(o, '__dict__', str(o))))