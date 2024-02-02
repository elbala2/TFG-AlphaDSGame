import json

from slabs import *
from utils import indexOf, apply

from config import (
  playerColors,
  cardTypes,
  
  up,
  rotationOrder,
  positionVectors,

  x,
  y,
)

class Player:
  def __init__(self, id, name, cards, color, type=0):
    self.id = id
    self.name = name
    self.type = type
    self.color = color
    self.points = 0
    self.cards = cards
    self.hasBought = False
    self.board = [[None for i in range(4)] for i in range(4)]
    self.board[1][0] = Slab([1, 1, 1, 1], 'Start_' + color)
    self.way = []

  def startWay(self):
    self.way = [[0, 1]]

  def buy(self, slab, cards):
    costs = slab.costs.copy()

    if not self.canBuySlab(cards, costs, slab.type):
      return []

    i = len(cards) - 1
    deletedCards = []
    playerCards = self.cards.copy()
    while (i >= 0 and costs[0] + costs[1] + costs[2] > 0):
      index = indexOf(self.cards, cards[i])
      if index == -1:
        raise Exception('Card not found')
      cardType = self.cards[index].type

      cardTypesKeys = list(cardTypes.keys())
      for j in range(len(cardTypesKeys)):
        if (costs[j] > 0 and cardType == cardTypesKeys[j]):
          deletedCards += [playerCards.pop(index)]
          costs[j] -= 1

      i -= 1
    self.cards = playerCards
    return deletedCards
  
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

  def whereCanBePlace(self, slab, destiny, rotation = 0):
    slabLinks = slab.getRotatedLinks(rotation)

    done = True
    if (destiny[x] == 0 and destiny[y] == 2):
      done = slabLinks[up] == 1

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

  def canBuySlab(self, cards, costs, slabColor = ''):
    if playerColors.__contains__(slabColor) and slabColor != self.color: return False
    if cards == None:
      cards = self.cards
    domainList = list(filter(lambda f: f.type == 'domain', cards))
    computerScienceList = list(filter(lambda f: f.type == 'compSci', cards))
    mathematicsList = list(filter(lambda f: f.type == 'math', cards))
    return len(domainList) >= costs[0] and len(computerScienceList) >= costs[1] and len(mathematicsList) >= costs[2]

  def canSolveRisk(self, risk):
    requiredCardsNeeded = list(filter(lambda f: risk.costIndexNeeded(f) != -1, self.cards))
    return len(requiredCardsNeeded) >= risk.costs

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
