import json

from slabs import *
from utils import *


def toJSON(obj):
  return json.loads(json.dumps(obj, default=lambda o: getattr(o, '__dict__', str(o))))


class Player:
  def __init__(self, id, name, start, cards, color, type=0):
    self.id = id
    self.name = name
    self.type = type
    self.color = color
    self.points = 0
    self.cards = cards
    self.hasBougth = False
    self.board = [[None for i in range(4)] for i in range(4)]
    self.start = start
    self.board[start][0] = Slab([1, 1, 1, 1], 'Start_' + str(id))
    if (id == 0):
      self.board[start][0].isHere = True

  def buy(self, slab, cards):
    costs = slab.costs

    if not self.canBuySlab(cards, costs):
      return []

    i = len(cards) - 1
    deletedCards = []
    while (i >= 0 and costs[0] + costs[1] + costs[2] > 0):
      index = indexOf(self.cards, cards[i])
      if index == -1:
        raise Exception('Card not found')
      cardType = self.cards[index].type
      if (costs[0] > 0 and cardType[0] == 'Domain'):
        deletedCards += [self.cards.pop(index)]
        costs[0] -= 1
      if (costs[1] > 0 and cardType[0] == 'Computer Science'):
        deletedCards += [self.cards.pop(index)]
        costs[1] -= 1
      if (costs[2] > 0 and cardType[0] == 'Mathematics'):
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

    # comprueba el de arriba del destino
    if (y + 1 >= 0):
      slabEnTablero = self.board[y+1][x]
      if (slabEnTablero != None):
        if ((slab.ApplyRotation()[arriba] and slabEnTablero.ApplyRotation()[abajo]) == 1 and hecho):
          return 1

    # comprueba el de la derecha del destino
    if (destiny[1] + 1 <= 3):
      slabEnTablero = self.board[destiny[0]][destiny[1] + 1]
      if (slabEnTablero != None and (not here or not slabEnTablero.wasHere)):
        if ((slab.ApplyRotation()[derecha] and slabEnTablero.ApplyRotation()[izquierda]) == 1 and hecho):
          return 2

    # comprueba el de abajo del destino
    if (destiny[0] + 1 <= 3):
      slabEnTablero = self.board[destiny[0] + 1][destiny[1]]
      if (slabEnTablero != None and (not here or not slabEnTablero.wasHere)):
        if ((slab.ApplyRotation()[abajo] and slabEnTablero.ApplyRotation()[arriba]) == 1 and hecho):
          return 3

    # comprueba el de la izquierda del destino
    if (destiny[1] - 1 >= 0):
      slabEnTablero = self.board[destiny[0]][destiny[1] - 1]
      if (slabEnTablero != None and (not here or not slabEnTablero.wasHere)):
        if ((slab.ApplyRotation()[izquierda] and slabEnTablero.ApplyRotation()[derecha]) == 1 and hecho):
          return 4
    return 0

  def whereCanBePlace(self, slab, destiny, rotation = 0, here = False):
    arriba = 0
    derecha = 1
    abajo = 2
    izquierda = 3

    slabLinks = slab.getRotatedLinks(rotation)

    hecho = True
    if (destiny[0] == 0 and destiny[1] == 2):
      hecho = slabLinks[arriba] == 1

    # comprueba el de arriba del destino
    if (destiny[0] - 1 >= 0):
      slabEnTablero = self.board[destiny[0] - 1][destiny[1]]
      if (slabEnTablero != None and (not here or not slabEnTablero.wasHere)):
        if ((slabLinks[arriba] and slabEnTablero.ApplyRotation()[abajo]) == 1 and hecho):
          return 1

    # comprueba el de la derecha del destino
    if (destiny[1] + 1 <= 3):
      slabEnTablero = self.board[destiny[0]][destiny[1] + 1]
      if (slabEnTablero != None and (not here or not slabEnTablero.wasHere)):
        if ((slabLinks[derecha] and slabEnTablero.ApplyRotation()[izquierda]) == 1 and hecho):
          return 2

    # comprueba el de abajo del destino
    if (destiny[0] + 1 <= 3):
      slabEnTablero = self.board[destiny[0] + 1][destiny[1]]
      if (slabEnTablero != None and (not here or not slabEnTablero.wasHere)):
        if ((slabLinks[abajo] and slabEnTablero.ApplyRotation()[arriba]) == 1 and hecho):
          return 3

    # comprueba el de la izquierda del destino
    if (destiny[1] - 1 >= 0):
      slabEnTablero = self.board[destiny[0]][destiny[1] - 1]
      if (slabEnTablero != None and (not here or not slabEnTablero.wasHere)):
        if ((slabLinks[izquierda] and slabEnTablero.ApplyRotation()[derecha]) == 1 and hecho):
          return 4
    return 0

  def putSlab(self, slab, destiny, rotation):
    if (destiny == None or self.board[destiny[0]][destiny[1]] != None):
      return False

    if (self.whereCanBePlace(slab, destiny, rotation) == 0):
      print('Not posible<')
      return False

    slab.rotation = rotation
    self.board[destiny[0]][destiny[1]] = slab
    if (destiny[0] == 0 and destiny[1] == 2):
      self.points += 10
    self.points += slab.points
    self.hasBougth = True
    return True

  def canBuySlab(self, cards, costs):
    if cards == None:
      cards = self.cards
    domainList = list(filter(lambda f: f.type[0] == 'Domain', cards))
    computerScienceList = list(filter(lambda f: f.type[0] == 'Computer Science', cards))
    mathematicsList = list(filter(lambda f: f.type[0] == 'Mathematics', cards))
    return len(domainList) >= costs[0] and len(computerScienceList) >= costs[1] and len(mathematicsList) >= costs[2]

  def canSolveRisk(self, risk):
    requiredCardsNeeded = list(filter(lambda f: risk.isCardNeeded(f), self.cards))
    return len(requiredCardsNeeded) >= risk.costs

  def getCloseLinks(self, coords, movement):
    link = None
    x = coords[1] + movement[1]
    y = coords[0] + movement[0]
    if 0 <= x < 4 and 0 <= y < 4:
      slab = self.board[y][x]
      if slab != None:
        link = slab.ApplyRotation()
    return link

  def getPosiblePlaces(self, slab):
    res = []
    arriba = [-1, 0]
    derecha = [0, 1]
    abajo = [1, 0]
    izquierda = [0, -1]
    for y in range(4):
      for x in range(4):
        if self.board[y][x] == None:
          link_arriba    = self.getCloseLinks([y, x], arriba)
          link_derecha   = self.getCloseLinks([y, x], derecha)
          link_abajo     = self.getCloseLinks([y, x], abajo)
          link_izquierda = self.getCloseLinks([y, x], izquierda)
          for rot in range(4):
            slabLinks = slab.getRotatedLinks(rot)
            
            if ((link_arriba   != None and slabLinks[0]  and link_arriba[2]   ) \
            or (link_derecha   != None and slabLinks[1]  and link_derecha[3]  ) \
            or (link_abajo     != None and slabLinks[2]  and link_abajo[0]    ) \
            or (link_izquierda != None and slabLinks[3]  and link_izquierda[1]))\
            and (x != 2 or y != 0 or (slabLinks[0] and x == 2 and y == 0)):
              res += [{ 'pos': [x, y], 'rotation': rot }]

    return res

  def getCards(self, slab):
    res = []
    costs = slab.costs.copy()
    for card in self.cards:
      if costs[0] >= 1 and card.type[0] == 'Domain':
        res += [card]
        costs[0] -= 1
      if costs[1] >= 1 and card.type[0] == 'Computer Science':
        res += [card]
        costs[1] -= 1
      if costs[2] >= 1 and card.type[0] == 'Mathematics':
        res += [card]
        costs[2] -= 1
    return res

  def getRiskCards(self, risk):
    res = []
    costs = risk.costs
    for card in self.cards:
      if costs >= 1 and len(res) < risk.costs and card.type[1] == risk.needed:
        res += [card]
        costs -= 1
    return res

  def toJSON(self):
    return json.loads(json.dumps(self, default=lambda o: getattr(o, '__dict__', str(o))))
