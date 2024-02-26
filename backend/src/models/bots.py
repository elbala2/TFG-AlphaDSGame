from src.models.slabs import *

from src.utils.utils import findIndexById
from src.utils.GameConfig import (
  playerColors,
  cardTypes,
  rotationOrder,
  positionVectors,
  x,
  y,
)

class Bot:
  def __init__(self, game):
    self.game = game

  def getRiskToResolve(self):
    bot = self.game.getActualPlayer()
    res = []
    if not self.game.riskNumber:
      return []
    for specialItems in self.game.specialMarket:
      if specialItems.isRisk and bot.canSolveRisk(specialItems):
        res += [{
          'targetRiskId': specialItems.id,
          'cards': bot.getRiskCards(specialItems),
        }]
    return res

  def resolveRisks(self):
    bot = self.game.getActualPlayer()
    riskToResolve = self.getRiskToResolve()
    if len(riskToResolve) == 0:
      return False
    done = False
    while (len(riskToResolve) != 0):
      targetRiskId, cards = riskToResolve.pop(0).values()
      riskIndex = findIndexById(self.game.specialMarket, targetRiskId)
      if bot.canSolveRisk(self.game.specialMarket[riskIndex]):
        done = True
        self.game.fix(targetRiskId, cards)
    return done

  def getDistance(self, pos):
    return abs(2 - pos[x]) + abs(-1 - pos[y])

  def dirMark(self, link, pos, compDirection, board):
    distance = self.getDistance(pos)
    pointingInside = (0 <= pos[x] <= 3 and 0 <= pos[y] <= 3)
    if link:
      if not pointingInside:
        return 16
      if board[pos[y]][pos[x]] == None:
        return distance
      if board[pos[y]][pos[x]].applyRotation()[compDirection]:
        return 0
    if pointingInside and board[pos[y]][pos[x]] != None and board[pos[y]][pos[x]].applyRotation()[compDirection] == 1:
      return 16
    return 8

  def getMark(self, slab, place, board):
    mark = 0
    pos = place['pos']
    mark -= slab.points * 2
    links = slab.getRotatedLinks(place['rotation'])
    mark += self.getDistance(pos)
    mark += sum(slab.costs)
    if pos[x] == 2 and pos[y] == 0:
      mark -= 100

    for direction in rotationOrder:
      compDirection = (direction + (len(rotationOrder) // 2)) % len(rotationOrder)
      vector = positionVectors[direction]
      mark += self.dirMark(links[direction] == 1, [pos[x] + vector[x], pos[y] + vector[y]], compDirection, board)
    return mark

  def computeSlab(self, slab):
    bot = self.game.getActualPlayer()
    best = None
    if bot.canBuySlab(None, slab.costs, slab.type):
      cards = bot.getCards(slab)
      for place in bot.getPossiblePlaces(slab):
        mark = self.getMark(slab, place, bot.board)
        if best == None or mark < best['mark']:
          best = {
            'targetSlabId': slab.id,
            'mark': mark,
            'pos': place['pos'],
            'rotation': place['rotation'],
            'cards': cards,
          }
    return best

  def getPossibleSlabsToBuy(self):
    actualPlayer = self.game.getActualPlayer()

    best = None
    for slabIndex in range(len(self.game.normalMarket)):
      slab = self.game.normalMarket[slabIndex]
      opt = self.computeSlab(slab)
      if opt != None and (best == None or opt['mark'] < best['mark']):
        best = opt

    for slabIndex in range(4, len(self.game.specialMarket) + 4):
      slab = self.game.specialMarket[slabIndex - 4]
      if not slab.isRisk and slab.type == actualPlayer.color:
        opt = self.computeSlab(slab)
        if opt != None and (best == None or opt['mark'] < best['mark']):
          best = opt
      
    return best

  def buyPlaceSlab(self):
    if self.game.riskNumber:
      return False
    slabsToBuy = self.getPossibleSlabsToBuy()
    if slabsToBuy == None:
      return False
    targetSlabId, _, pos, rotation, cards = slabsToBuy.values()
    return self.game.moveSlab(targetSlabId, [pos[x], pos[y]], rotation, cards)

  def computeCards(self):
    bot = self.game.getActualPlayer()
    cardIds = []
    types = [0,0,0]
    if len(bot.cards) != 4: return False

    if self.game.riskNumber:
      risks = list(filter(lambda slab: slab.isRisk, self.game.specialMarket))
    for card in bot.cards:
      if self.game.riskNumber:
        needed = False
        for risk in risks:
          if risk.costIndexNeeded(card) != -1:
            needed = True
            break
        if not needed:
          cardIds += [card.id]
      else:
        cardTypeKeys = list(cardTypes.keys())
        for i in range(len(cardTypeKeys)):
          if card.type == cardTypeKeys[i]:
            if types[i] > 0:
              cardIds += [card.id]
            else:
              types[i] += 1

    for cardId in cardIds:
      self.game.discard(cardId)
    return len(cardIds) != 0

  def getCardsConfig(self, slab):
    bot = self.game.getActualPlayer()
    blockedIds = []
    if slab.isRisk:
      costs = [slab.costs]
    else:
      costs = slab.costs.copy()

    for card in bot.cards:
      costNeed = slab.costIndexNeeded(card)
      if costNeed != -1 and costs[costNeed]:
        blockedIds += [card.id]
        costs[costNeed] -= 1
    if sum(costs) == 0 or len(blockedIds) == len(bot.cards):
      return []
    else:
      needed = []
      for player in self.game.players:
        if player.id != bot.id:
          costsCopy = costs.copy() 
          cardIds = []
          for card in player.cards:
            costNeed = slab.costIndexNeeded(card)
            if costNeed != -1 and costsCopy[costNeed]:
              cardIds += [card.id]
              costsCopy[costNeed] -= 1
            if sum(costsCopy) == 0:
              if len(cardIds) > 0:
                needed += [{
                  'cardIds': cardIds,
                  'playerId': player.id,
                }]
              break
      if len(needed) == 0 or len(blockedIds) == 0:
        return []
      return [{
        'slab': slab,
        'blockedIds': blockedIds,
        'needed': needed,
      }]

  def getPreferredRiskCards(self):
    res = []
    for slab in self.game.specialMarket:
      if slab.isRisk and self.game.canRiskBeSolved(slab):
        res += self.getCardsConfig(slab)
    res.sort(key=lambda z: len(z['needed']))
    return res
  
  def getBestSlabMark(self, slab):
    bot = self.game.getActualPlayer()
    if bot.canBuySlab(None, slab.costs, slab.type):
      return 0
    best = 999
    for place in bot.getPossiblePlaces(slab):
      best = min(self.getMark(slab, place, bot.board), best)
    return best

  def getPreferredSlabCards(self):
    bot = self.game.getActualPlayer()

    res = []
    for specialSlab in self.game.specialMarket:
      if not specialSlab.isRisk and bot.color == specialSlab.type and self.game.canSlabBeBought(specialSlab):
        if bot.canBuySlab(None, specialSlab.costs, specialSlab.type):
          return []
        res += self.getCardsConfig(specialSlab)

    best = 999

    slabs = self.game.normalMarket.copy()
    slabs.sort(key=lambda x: self.getBestSlabMark(x))

    for slab in slabs:
      mark = self.getBestSlabMark(slab) == 0
      if mark <= best and bot.canBuySlab(None, slab.costs, slab.type):
        return []
      else:
        res += self.getCardsConfig(slab)

    res.sort(key=lambda z: self.getBestSlabMark(z['slab']))
    return res


  def getPreferredCards(self):
    if self.game.riskNumber:
      return self.getPreferredRiskCards()
    else:
      return self.getPreferredSlabCards()

  def trade(self):
    cardConfigurations = self.getPreferredCards()
    if len(cardConfigurations) == 0:
      return False
    return {
      'action': 'trade',
      'cardConfig': cardConfigurations,
    }
