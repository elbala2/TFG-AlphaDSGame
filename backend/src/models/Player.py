import uuid

from src.models.Cards import dictToCard
from src.models.slabs import *
from src.utils.utils import findIndexById, apply

from src.utils.GameConfig import (
  playerColors,
  cardTypes,
  
  up,
  rotationOrder,
  positionVectors,

  x,
  y,
)

class Player:
  def __init__(self,
    name,
    color,
    cards,
    playerId = None,
    playerType = 0,
    points = 0,
    hasBought = False,
    board = None,
    way = []
  ):
    self.name = name
    self.color = color
    if playerId == None:
      self.id = uuid.uuid4().__str__()
    else:
      self.id = playerId
    self.type = playerType
    self.points = points
    self.cards = cards
    self.hasBought = hasBought
    self.way = way

    if board != None:
      self.board = board
    else:
      self.board = [[None for i in range(4)] for i in range(4)]
      self.board[1][0] = Slab(links=[1, 1, 1, 1], slabType='Start_' + color)


  def startWay(self):
    self.way = [[0, 1]]


  def rateSteps(self, steps):
    mark = len(steps) * 2
    lastStep = steps[-1]
    if (lastStep[x] != 2 or lastStep[y] != 0):
      mark += 20
      mark += (abs(2 - lastStep[x]) + abs(0 - lastStep[y])) * 3
    return mark


  def getNextOpt(self, steps):
    lastStep = steps[-1]
    board = self.board
    lastSlab = board[lastStep[y]][lastStep[x]]
    lastSlabLinks = lastSlab.applyRotation() 
    res = []

    for direction in rotationOrder: 
      vector = positionVectors[direction]
      compDirection = (direction + (len(rotationOrder) // 2)) % len(rotationOrder)
      if lastSlabLinks[direction] \
        and 0 <= lastStep[x] + vector[x] < 3 and 0 <= lastStep[y] + vector[y] < 3 \
        and board[lastStep[y] + vector[y]][lastStep[x] + vector[x]] is not None \
        and board[lastStep[y] + vector[y]][lastStep[x] + vector[x]].applyRotation()[compDirection] \
        and not apply(steps, lambda prev, curr: prev or (curr[x] == lastStep[x] + vector[x] and curr[y] == lastStep[y] + vector[y]), False):
          res.append([lastStep[x] + vector[x], lastStep[y] + vector[y]])

    return res


  def getBestWay(self, steps):
    lastStep = steps[-1]

    if lastStep[x] == 2 and lastStep[y] == 0:
      return steps

    nextOpts = self.getNextOpt(steps)
    if len(nextOpts) == 0 :
      return steps

    bestWay = steps
    bestWayMark = self.rateSteps(bestWay)

    for nextOpt in nextOpts:
      wayCandidate = self.getBestWay(steps + [nextOpt])
      wayCandidateMark = self.rateSteps(wayCandidate)

      if bestWayMark > wayCandidateMark:
        bestWay = wayCandidate
        bestWayMark = wayCandidateMark
    return bestWay


  def moveWay(self):
    if self.way[-1][x] == 2 and self.way[-1][y] == 0:
      return True

    nextSteps = self.getBestWay(self.way)
    if len(nextSteps) > len(self.way):
      self.way += [nextSteps[len(self.way)]]
    return False


  def canSolveRisk(self, risk):
    requiredCardsNeeded = list(filter(lambda f: risk.costIndexNeeded(f) != -1, self.cards))
    return len(requiredCardsNeeded) >= risk.costs


  def canBuySlab(self, cards, costs, slabColor = ''):
    if playerColors.__contains__(slabColor) and slabColor != self.color: return False
    if cards == None:
      cards = self.cards
    domainList = list(filter(lambda f: f.type == 'domain', cards))
    computerScienceList = list(filter(lambda f: f.type == 'compSci', cards))
    mathematicsList = list(filter(lambda f: f.type == 'math', cards))
    return len(domainList) >= costs[0] and len(computerScienceList) >= costs[1] and len(mathematicsList) >= costs[2]


  def buy(self, slab, cards):
    costs = slab.costs.copy()

    if not self.canBuySlab(self.cards, costs, slab.type):
      raise Exception('Slab not bought')

    i = 0
    deletedCards = []
    cardTypesKeys = list(cardTypes.keys())

    while (i < len(cards) and costs[0] + costs[1] + costs[2] > 0):
      card = cards[i]
      cIndex = findIndexById(self.cards, card.id)

      if cIndex == -1:
        raise Exception('Card not found')

      for j in range(len(cardTypesKeys)):

        if (costs[j] > 0 and card.type == cardTypesKeys[j]):
          deletedCards += [self.cards.pop(cIndex)]
          costs[j] -= 1

      i += 1

    return deletedCards


  def whereCanBePlace(self, slab, destiny, rotation = 0):
    slabLinks = slab.getRotatedLinks(rotation)

    done = True
    if (destiny[x] == 2 and destiny[y] == 0):
      if slabLinks[up] == 1:
        return 1
      else:
        return 0

    for direction in rotationOrder: 
      vector = positionVectors[direction]
      compDirection = (direction + (len(rotationOrder) // 2)) % len(rotationOrder)

      if (0 <= destiny[x] + vector[x] <= 3 and 0 <= destiny[y] + vector[y] <= 3):
        slabOnBoard = self.board[destiny[y] + vector[y]][destiny[x] + vector[x]]
        if slabOnBoard != None and slabLinks[direction] and slabOnBoard.applyRotation()[compDirection] and done:
            return direction + 1

    return 0


  def putSlab(self, slab, destiny, rotation):
    if (destiny == None or self.board[destiny[y]][destiny[x]] != None):
      return False

    if (self.whereCanBePlace(slab, destiny, rotation) == 0):
      return False

    slab.rotation = rotation
    self.board[destiny[y]][destiny[x]] = slab
    if (destiny[y] == 0 and destiny[x] == 2):
      self.points += 10
    self.points += slab.points
    self.hasBought = True
    return True


  def getCloseLinks(self, coords, movement):
    link = None
    x1 = coords[x] + movement[x]
    y1 = coords[y] + movement[y]
    if 0 <= x1 <= 3 and 0 <= y1 <= 3:
      slab = self.board[y1][x1]
      if slab != None:
        link = slab.applyRotation()
    return link


  def getPositionPlaces(self, slab, coords):
    if self.board[coords[y]][coords[x]] != None:
      return []

    res = []
    zoneLinks = []

    for direction in rotationOrder:
      vector = positionVectors[direction]
      zoneLinks += [self.getCloseLinks(coords, vector)]

    for rotation in rotationOrder:
      slabLinks = slab.getRotatedLinks(rotation)
      isValid = False

      for direction in rotationOrder:
        compDirection = (direction + (len(rotationOrder) // 2)) % len(rotationOrder)
        if slabLinks[direction] and zoneLinks[direction] != None and zoneLinks[direction][compDirection]:
          isValid = True

      if isValid and (coords[x] != 2 or coords[y] != 0 or (slabLinks[up] and coords[x] == 2 and coords[y] == 0)):
        res += [{ 'pos': coords, 'rotation': rotation }]

    return res


  def getPossiblePlaces(self, slab):
    res = []
    for y1 in range(4):
      for x1 in range(4):
        res += self.getPositionPlaces(slab, [x1, y1])
    return res


  def getCards(self, slab):
    res = []
    costs = slab.costs.copy()
    cardTypesKeys = list(cardTypes.keys())
    for card in self.cards:
      for i in range(len(cardTypesKeys)):
        if (costs[i] >= 1 and card.type == cardTypesKeys[i]):
          res += [card]
          costs[i] -= 1

    return res


  def getRiskCards(self, risk):
    res = []
    costs = risk.costs
    for card in self.cards:
      if costs >= 1 and len(res) < risk.costs and card.subType == risk.needed:
        res += [card]
        costs -= 1
    return res


def dictToPlayer(dict):
  if dict == None:
    return None
  
  return Player(
    playerId = dict['id'],
    name = dict['name'],
    color = dict['color'],
    playerType = dict['type'],
    points = dict['points'],
    way = dict['way'],
    hasBought = dict['hasBought'],
    board = [[dictToSlab(dict['board'][y][x]) for x in range(4)] for y in range(4)],
    cards = [dictToCard(c) for c in dict['cards']],
  )