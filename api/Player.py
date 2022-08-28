import json

from slabs import *
from utils import *

class Player:
  def __init__(self, id, name, start, cards, type = 0):
    self.id = id
    self.name = name
    self.type = type
    self.points = 0
    self.cards = cards
    self.hasBougth = False
    self.board = [[None for i in range(4) ] for i in range(4)]
    self.board[start][0] = Slab([1, 1, 1, 1], 'Start_' + str(id))
    if (id == 0):
      self.board[start][0].isHere = True
      
  def buy(self, slab, cards):
    costs = slab.costs
    if(len(filter(lambda f: f.type[0] == 'Domain', cards)) < costs[0]) \
      or  \
      (len(filter(lambda f: f.type[0] == 'Computer Science', cards)) < costs[1]) \
      or \
      (len(filter(lambda f: f.type[0] == 'Mathematics', cards)) < costs[2]):
        raise Exception()

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
  
  def whereCanBePlace(slab, origin, here = False):
    arriba = 0
    derecha = 1
    abajo = 2
    izquierda = 3

    hecho = True;
    if (origin[0] == 0 and origin[1] == 2):
      hecho = slab.ApplyRotation()[arriba] == 1
    #comprueba el de arriba del destino
    if (origin[0] - 1 >= 0) :
      slabEnTablero = self.board[origin[0] - 1][origin[1]];
      if (slabEnTablero != None and (not here or not slabEnTablero.wasHere)):
        if ((slab.ApplyRotation()[arriba] and rotaLinks(slabEnTablero)[abajo]) == 1 and hecho):
          return 1

    #comprueba el de la derecha del destino
    if (origin[1] + 1 <= 3) :
      slabEnTablero = self.board[origin[0]][origin[1] + 1];
      if (slabEnTablero != None and (not here or not slabEnTablero.wasHere)):
        if ((slab.ApplyRotation()[derecha] and rotaLinks(slabEnTablero)[izquierda]) == 1 and hecho):
          return 2

    #comprueba el de abajo del destino
    if (origin[0] + 1 <= 3) :
      slabEnTablero = self.board[origin[0] + 1][origin[1]];
      if (slabEnTablero != None and (not here or not slabEnTablero.wasHere)):
        if ((slab.ApplyRotation()[abajo] and rotaLinks(slabEnTablero)[arriba]) == 1 and hecho):
          return 3

    #comprueba el de la izquierda del destino
    if (origin[1] - 1 >= 0) :
      slabEnTablero = self.board[origin[0]][origin[1] - 1];
      if (slabEnTablero != None and (not here or not slabEnTablero.wasHere)):
        if ((slab.ApplyRotation()[izquierda] and rotaLinks(slabEnTablero)[derecha]) == 1 and hecho):
          return 4
    return 0;
      
  def putSlab(self, slab, destiny):
    if (destiny == None or self.board[destiny[0]][destiny[1]]):
      raise Exception('')
    
    if (whereCanBePlace(slab, destiny) == 0):
      raise Exception(
        'Posicion',
        destiny[0],
        destiny[1],
        'no valida',
        whereCanBePlace(slab, destiny)
      );

    self.board[destiny[0]][destiny[1]] = slab
    if (destiny[0] == 0 and destiny[1] == 2):
      self.points += 10;
    self.points += slab.points;

  def toJSON(self):
    return json.loads(json.dumps(self, default=lambda o: getattr(o, '__dict__', str(o))))