import json

from slabs import *
from utils import indexOf, apply


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
    self.way = []

  def startWay(self):
    self.way = [[0, 1]]

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
  
  def rateSteps(self, steps):
    mark = len(steps) * 2
    x = 0
    y = 1
    lastStep = steps[-1]
    if (lastStep[x] != 2 or lastStep[y] != 0):
      mark += 20
      mark += (abs(2 - lastStep[x]) + abs(0 - lastStep[y])) * 3
    return mark
  
    
  def getNextOpt(self, steps):
    x = 0
    y = 1
    lastStep = steps[-1]
    board = self.board
    lastSlab = board[lastStep[y]][lastStep[x]]
    lastSlabLinks = lastSlab.ApplyRotation() 
    res = []

    if 0 <= lastStep[x] < 3 and 0 <= lastStep[y] - 1 < 3  \
      and lastSlabLinks[0] \
      and board[lastStep[y] - 1][lastStep[x]] is not None \
      and board[lastStep[y] - 1][lastStep[x]].ApplyRotation()[2] \
      and not apply(steps, lambda prev, curr: prev or (curr[x] == lastStep[x] and curr[y] == lastStep[y] - 1), False):
        res.append([lastStep[x], lastStep[y] - 1])

    if 0 <= lastStep[x] + 1 < 3 and 0 <= lastStep[y] < 3 \
      and lastSlabLinks[1] \
      and board[lastStep[y]][lastStep[x] + 1] is not None \
      and board[lastStep[y]][lastStep[x] + 1].ApplyRotation()[3] \
      and not apply(steps, lambda prev, curr: prev or (curr[x] == lastStep[x] + 1 and curr[y] == lastStep[y]), False):
        res.append([lastStep[x] + 1, lastStep[y]])

    if 0 <= lastStep[x] < 3 and 0 <= lastStep[y] + 1 < 3 \
      and lastSlabLinks[2] \
      and board[lastStep[y] + 1][lastStep[x]] is not None \
      and board[lastStep[y] + 1][lastStep[x]].ApplyRotation()[0] \
      and not apply(steps, lambda prev, curr: prev or (curr[x] == lastStep[x] and curr[y] == lastStep[y] + 1), False):
        res.append([lastStep[x], lastStep[y] + 1])

    if 0 <= lastStep[x] - 1 < 3 and 0 <= lastStep[y] < 3 \
      and lastSlabLinks[3] \
      and board[lastStep[y]][lastStep[x] - 1] is not None \
      and board[lastStep[y]][lastStep[x] - 1].ApplyRotation()[1] \
      and not apply(steps, lambda prev, curr: prev or (curr[x] == lastStep[x] - 1 and curr[y] == lastStep[y]), False):
        res.append([lastStep[x] - 1, lastStep[y]])

    return res
    

  def getBestWay(self, steps):
    x = 0
    y = 1
    lastStep = steps[-1]

    if lastStep[x] == 2 and lastStep[y] == 0:
      return steps

    nextOpts = self.getNextOpt(steps)
    if len(nextOpts) == 0 :
      return steps
    
    bestWay = steps
    bestWayMark = self.rateSteps(bestWay)
    print('bestWay', bestWay)
    print('bestWayMark', bestWayMark)
    for nextOpt in nextOpts:
      wayCandidate = self.getBestWay(steps + [nextOpt])
      wayCandidateMark = self.rateSteps(wayCandidate)
      print('wayCandidate', wayCandidate)
      print('bestWayMark', wayCandidateMark)

      if bestWayMark > wayCandidateMark:
        bestWay = wayCandidate
        bestWayMark = wayCandidateMark
    return bestWay
  
  def moveWay(self):
    x = 0
    y = 1

    if self.way[-1][x] == 2 and self.way[-1][y] == 0:
      return True

    nextSteps = self.getBestWay(self.way)
    print(self.way)
    if len(nextSteps) > len(self.way):
      print(nextSteps)
      print(nextSteps[len(self.way)])
      self.way += [nextSteps[len(self.way)]]
    return False

  def whereCanBePlace(self, slab, destiny, rotation = 0):
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
      if slabEnTablero != None and slabLinks[arriba] and slabEnTablero.ApplyRotation()[abajo] and hecho:
          return 1

    # comprueba el de la derecha del destino
    if (destiny[1] + 1 <= 3):
      slabEnTablero = self.board[destiny[0]][destiny[1] + 1]
      if slabEnTablero and slabLinks[derecha] and slabEnTablero.ApplyRotation()[izquierda] and hecho:
          return 2

    # comprueba el de abajo del destino
    if (destiny[0] + 1 <= 3):
      slabEnTablero = self.board[destiny[0] + 1][destiny[1]]
      if slabEnTablero != None and slabLinks[abajo] and slabEnTablero.ApplyRotation()[arriba] and hecho:
          return 3

    # comprueba el de la izquierda del destino
    if (destiny[1] - 1 >= 0):
      slabEnTablero = self.board[destiny[0]][destiny[1] - 1]
      if slabEnTablero != None and slabLinks[izquierda] and slabEnTablero.ApplyRotation()[derecha] and hecho:
          return 4
    return 0

  def putSlab(self, slab, destiny, rotation):
    if (destiny == None or self.board[destiny[0]][destiny[1]] != None):
      return False

    if (self.whereCanBePlace(slab, destiny, rotation) == 0):
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

  def getPositionPlaces(self, slab, x, y):
    if self.board[y][x] != None:
      return []
    
    arriba = [-1, 0]
    derecha = [0, 1]
    abajo = [1, 0]
    izquierda = [0, -1]

    res = []
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

  def getPosiblePlaces(self, slab):
    res = []
    for y in range(4):
      for x in range(4):
        res += self.getPositionPlaces(slab, x, y)
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
