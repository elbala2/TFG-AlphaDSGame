from slabs import *
from utils import (
  findById,
)

from config import (
  playerColors,
  cardTypes,
  rotationOrder,
  positionVectors,
  x,
  y,
)

class Bot:
  def getRiskToResolve(self, game):
    bot = game.getActualPlayer()
    res = []
    if not game.hasRisk:
      return []
    for specialItems in game.specialMarket:
      if specialItems.isRisk and bot.canSolveRisk(specialItems):
        res += [{
          'targetRiskId': specialItems.id,
          'cards': bot.getRiskCards(specialItems),
        }]
    return res

  def resolveRisks(self, game):
    bot = game.getActualPlayer()
    riskToResolve = self.getRiskToResolve(game)
    if len(riskToResolve) == 0:
      return False
    done = False
    while (len(riskToResolve) != 0):
      targetRiskId, cards = riskToResolve.pop(0).values()
      riskIndex = findById(game.specialMarket, targetRiskId)
      if bot.canSolveRisk(game.specialMarket[riskIndex]):
        done = True
        game.fix(riskIndex, cards)
    return done

  def getDistance(self, pos):
    return abs(2 - pos[x]) + abs(-1 - pos[y])

  def dirMark(self, link, pos, compDirection, board):
    distance = self.getDistance(pos)
    pointingInside = (0 <= pos[x] <= 3 and 0 <= pos[y] <= 3)
    if link:
      if not pointingInside:
        return 30
      if board[pos[y]][pos[x]] == None:
        return distance
      if board[pos[y]][pos[x]].applyRotation()[compDirection]:
        return 0
    if pointingInside and board[pos[y]][pos[x]] != None and board[pos[y]][pos[x]].applyRotation()[compDirection] == 1:
      return 30
    return 0

  def getMark(self, slab, place, board):
    mark = 0
    pos = place['pos']
    mark -= slab.points * 4
    links = slab.getRotatedLinks(place['rotation'])
    mark -= self.getDistance(pos) * 4
    mark += sum(slab.costs)
    if pos[x] == 2 and pos[y] == 0:
      mark -= 40

    for direction in rotationOrder:
      compDirection = (direction + (len(rotationOrder) // 2)) % len(rotationOrder)
      vector = positionVectors[direction]
      mark += self.dirMark(links[direction] == 1, [pos[x] + vector[x], pos[y] + vector[y]], compDirection, board)
    return mark

  def computeSlab(self, game, slabIndex, slab):
    bot = game.getActualPlayer()
    best = None
    if bot.canBuySlab(None, slab.costs, slab.type):
      cards = bot.getCards(slab)
      for place in bot.getPossiblePlaces(slab):
        mark = self.getMark(slab, place, bot.board)
        if best == None or mark < best['mark']:
          best = {
            'targetSlabId': slabIndex,
            'mark': mark,
            'pos': place['pos'],
            'rotation': place['rotation'],
            'cards': cards,
          }
    return best

  def getPossibleSlabsToBuy(self, game):
    best = None
    for slabIndex in range(len(game.normalMarket)):
      slab = game.normalMarket[slabIndex]
      opt = self.computeSlab(game, slabIndex,  slab)
      if opt != None and (best == None or opt['mark'] < best['mark']):
        best = opt

    for slabIndex in range(4, len(game.specialMarket) + 4):
      slab = game.specialMarket[slabIndex - 4]
      if not slab.isRisk and slab.type == playerColors[game.actualPlayer]:
        opt = self.computeSlab(game, slabIndex, slab)
        if opt != None and (best == None or opt['mark'] < best['mark']):
          best = opt
      
    return best

  def buyPlaceSlab(self, game):
    if game.hasRisk:
      return False
    slabsToBuy = self.getPossibleSlabsToBuy(game)
    if slabsToBuy == None:
      return False
    targetSlabId, _, pos, rotation, cards = slabsToBuy.values()
    game.moveSlab(targetSlabId, [pos[x], pos[y]], rotation, cards)
    return True

  def computeCards(self, game):
    bot = game.getActualPlayer()
    cardIds = []
    types = [0,0,0]
    if len(bot.cards) != 4: return False

    if game.hasRisk:
      risks = list(filter(lambda slab: slab.isRisk, game.specialMarket))
    for card in bot.cards:
      if game.hasRisk:
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
      game.discard(cardId)
    return len(cardIds) != 0

  def getCardsConfig(self, game, slab):
    bot = game.getActualPlayer()
    blocked = []
    if slab.isRisk:
      costs = [slab.costs]
    else:
      costs = slab.costs.copy()

    for cardIndex in range(len(bot.cards)):
      card = bot.cards[cardIndex]
      costNeed = slab.costIndexNeeded(card)
      if costNeed != -1 and costs[costNeed]:
        blocked += [card.id]
        costs[costNeed] -= 1
    if sum(costs) == 0 or len(blocked) == len(bot.cards):
      return []
    else:
      needed = []
      for playerIndex in range(len(game.players)):
        if playerIndex != game.actualPlayer:
          costsCopy = costs.copy() 
          cards = []
          for cardIndex in range(len(game.players[playerIndex].cards)):
            card = game.players[playerIndex].cards[cardIndex]
            costNeed = slab.costIndexNeeded(card)
            if costNeed != -1 and costsCopy[costNeed]:
              cards += [card.id]
              costsCopy[costNeed] -= 1
            if sum(costsCopy) == 0:
              if len(cards) > 0:
                needed += [{
                  'cards': cards,
                  'player': playerIndex,
                }]
              break
      if len(needed) == 0 or len(blocked) == 0:
        return []
      return [{
        'slab': slab,
        'blocked': blocked,
        'needed': needed,
      }]

  def getPreferredRiskCards(self, game):
    res = []
    for index in range(len(game.specialMarket)):
      if game.specialMarket[index].isRisk and game.canRiskBeSolved(index):
        res += self.getCardsConfig(game, game.specialMarket[index])
    res.sort(key=lambda z: len(z['needed']))
    return res
  
  def getBestSlabMark(self, game, slab):
    bot = game.getActualPlayer()
    if bot.canBuySlab(None, slab.costs, slab.type):
      return 0
    best = 999
    for place in bot.getPossiblePlaces(slab):
      best = min(self.getMark(slab, place, bot.board), best)
    return best

  def getPreferredSlabCards(self, game):
    bot = game.getActualPlayer()

    res = []
    for index in range(len(game.specialMarket)):
      specialSlab = game.specialMarket[index]
      if not specialSlab.isRisk and bot.color == specialSlab.type and game.canSlabBeBought(index + 4):
        if bot.canBuySlab(None, specialSlab.costs, specialSlab.type):
          return []
        res += self.getCardsConfig(game, specialSlab)

    best = 999

    slabs = game.normalMarket.copy()
    slabs.sort(key=lambda x: self.getBestSlabMark(game, x))

    for slab in slabs:
      mark = self.getBestSlabMark(game, slab) == 0
      if mark <= best and bot.canBuySlab(None, slab.costs, slab.type):
        return []
      else:
        res += self.getCardsConfig(game, slab)

    res.sort(key=lambda z: self.getBestSlabMark(game, z['slab']))
    return res


  def getPreferredCards(self, game):
    if game.hasRisk:
      return self.getPreferredRiskCards(game)
    else:
      return self.getPreferredSlabCards(game)

  def trade(self, game):
    cardConfigurations = self.getPreferredCards(game)
    if len(cardConfigurations) == 0:
      return False
    return {
      'action': 'trade',
      'cardConfig': cardConfigurations,
    }
