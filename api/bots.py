from slabs import *
from utils import *

from config import playerColors

cardTypes = [
  'domain',
  'compSci',
  'math',
]

class Bot:
  def getRiskToResolve(self, game):
    bot = game.getActualPlayer()
    res = []
    if not game.hasRisk:
      return []
    for riskIndex in range(len(game.specialMarket)):
      if game.specialMarket[riskIndex].isRisk and bot.canSolveRisk(game.specialMarket[riskIndex]):
        res += [{
          'targetRiskId': game.specialMarket[riskIndex].id,
          'cards': bot.getRiskCards(game.specialMarket[riskIndex]),
        }]
    return res

  def resolveRisks(self, game):
    bot = game.getActualPlayer()
    riskToResolve = self.getRiskToResolve(game)
    if len(riskToResolve) == 0:
      return False
    hecho = False
    while (len(riskToResolve) != 0):
      targetRiskId, cards = riskToResolve.pop(0).values()
      riskIndex = findById(game.specialMarket, targetRiskId)
      if bot.canSolveRisk(game.specialMarket[riskIndex]):
        hecho = True
        game.fix(riskIndex, cards)

    return hecho

  def getDistance(self, x, y):
    return abs(2 - x) + abs(-1 - y)

  def dirMark(self, link, x, y, direction, board):
    distance = self.getDistance(x, y)
    pointingInside = (0 <= x <= 3 and 0 <= y <= 3)
    if link:
      if not pointingInside:
        return 20
      if board[x][y] == None:
        return distance
      if board[x][y].applyRotation()[direction]:
        return -distance
    if pointingInside and board[x][y] != None and board[x][y].applyRotation()[direction] == 1:
      return 30
    return 0

  def getMark(self, slab, place, board):
    mark = 0
    x = place['pos'][0]
    y = place['pos'][1]
    mark -= slab.points * 4
    links = slab.getRotatedLinks(place['rotation'])
    mark -= self.getDistance(x, y)
    mark += sum(slab.costs)
    if x == 2 and y == 0:
      mark -= 40
    mark += self.dirMark(links[0] == 1, x, y - 1, 2, board)
    mark += self.dirMark(links[1] == 1, x + 1, y, 3, board)
    mark += self.dirMark(links[2] == 1, x, y + 1, 0, board)
    mark += self.dirMark(links[3] == 1, x - 1, y, 1, board)
    return mark

  def computeSlab(self, game, slabIndex, slab):
    bot = game.getActualPlayer()
    res = []
    if bot.canBuySlab(None, slab.costs, slab.type):
      cards = bot.getCards(slab)
      for place in bot.getPosiblePlaces(slab):
        res += [{
          'targetSlabId': slabIndex,
          'mark': self.getMark(slab, place, bot.board),
          'pos': place['pos'],
          'rotation': place['rotation'],
          'cards': cards,
        }]
    return res

  def getPosibleSlabsToBuy(self, game):
    res = []
    for slabIndex in range(len(game.normalMarket)):
      slab = game.normalMarket[slabIndex]
      res += self.computeSlab(game, slabIndex,  slab)

    for slabIndex in range(4, len(game.specialMarket) + 4):
      slab = game.specialMarket[slabIndex - 4]
      if not slab.isRisk and slab.type == playerColors[game.actualPlayer]:
        res += self.computeSlab(game, slabIndex, slab)
      
    res.sort(key=lambda elem: elem['mark'])
    # for x in res:
      # print(x)
    return res

  def buyPlaceSlab(self, game):
    if game.hasRisk:
      return False
    slabsToBuy = self.getPosibleSlabsToBuy(game)
    if len(slabsToBuy) == 0:
      return False
    targetSlabId, _, pos, rotation, cards = slabsToBuy.pop(0).values()
    game.moveSlab(targetSlabId, [pos[0], pos[1]], rotation, cards)
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
          if risk.isCardNeeded(card):
            needed = True
            break
        if not needed:
          cardIds += [card.id]
      else:
        for i in range(len(cardTypes)):
          if card.type == cardTypes[i]:
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
      if slab.isCardNeeded(card):
        blocked += [card.id]
    if len(blocked) == sum(costs) or len(blocked) == len(bot.cards):
      return []
    else:
      needed = []
      for playerIndex in range(len(game.players)):
        if playerIndex != game.actualPlayer:
          cards = []
          for cardIndex in range(len(game.players[playerIndex].cards)):
            card = game.players[playerIndex].cards[cardIndex]
            if len(blocked) + len(cards) < sum(costs):
              if slab.isCardNeeded(card):
                cards += [card.id]
            else:
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

  def getPreferedRiskCards(self, game):
    res = []
    for index in range(len(game.specialMarket)):
      if game.specialMarket[index].isRisk and game.canRiskBeSolved(index):
        res += self.getCardsConfig(game, game.specialMarket[index])
    res.sort(key=lambda x: len(x['needed']))
    return res
  
  def getBestSlabMark(self, game, slab):
    bot = game.getActualPlayer()
    if bot.canBuySlab(None, slab.costs, slab.type):
      return 0
    best = 999
    for place in bot.getPosiblePlaces(slab):
      best = min(self.getMark(slab, place, bot.board), best)
    return best

  def getPreferedSlabCards(self, game):
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

    res.sort(key=lambda x: self.getBestSlabMark(game, x['slab']))
    return res


  def getPreferedCards(self, game):
    if game.hasRisk:
      return self.getPreferedRiskCards(game)
    else:
      return self.getPreferedSlabCards(game)

  def trade(self, game):
    cardConfigurations = self.getPreferedCards(game)
    if len(cardConfigurations) == 0:
      return False
    return {
      'action': 'trade',
      'cardConfig': cardConfigurations,
    }
