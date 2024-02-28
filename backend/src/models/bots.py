from src.models.slabs import *

from src.utils.utils import findIndexById, findIndex, findByFunc, apply
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
    self.player = self.game.getActualPlayer()

  def getRiskToResolve(self):
    res = []
    if not self.game.riskNumber:
      return []
    for specialItems in self.game.specialMarket:
      if specialItems.isRisk and self.player.canSolveRisk(specialItems):
        res += [{
          'targetRiskId': specialItems.id,
          'cards': self.player.getRiskCards(specialItems),
        }]
    return res

  def resolveRisks(self):
    riskToResolve = self.getRiskToResolve()
    if len(riskToResolve) == 0:
      return False
    done = False
    while (len(riskToResolve) != 0):
      targetRiskId, cards = riskToResolve.pop(0).values()
      riskIndex = findIndexById(self.game.specialMarket, targetRiskId)
      if self.player.canSolveRisk(self.game.specialMarket[riskIndex]):
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

  def computeSlab(self, slab, specificCards):
    best = None
    if self.player.canBuySlab(None, slab.costs, slab.type):
      if specificCards != None:
        cards = specificCards
      else:
        cards = self.player.getCards(slab)

      for place in self.player.getPossiblePlaces(slab):
        mark = self.getMark(slab, place, self.player.board)
        if best == None or mark < best['mark']:
          best = {
            'targetSlabId': slab.id,
            'mark': mark,
            'pos': place['pos'],
            'rotation': place['rotation'],
            'cards': cards,
          }
    return best

  def getPossibleSlabsToBuy(self, cards = None):
    best = None
    for slabIndex in range(len(self.game.normalMarket)):
      slab = self.game.normalMarket[slabIndex]
      opt = self.computeSlab(slab, cards)
      if opt != None and (best == None or opt['mark'] < best['mark']):
        best = opt

    for slabIndex in range(4, len(self.game.specialMarket) + 4):
      slab = self.game.specialMarket[slabIndex - 4]
      if not slab.isRisk and slab.type == self.player.color:
        opt = self.computeSlab(slab, cards)
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
    cardIds = []
    types = [0,0,0]
    if len(self.player.cards) != 4: return False

    if self.game.riskNumber:
      risks = list(filter(lambda slab: slab.isRisk, self.game.specialMarket))
    for card in self.player.cards:
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
    blockedIds = []
    if slab.isRisk:
      costs = [slab.costs]
    else:
      costs = slab.costs.copy()

    for card in self.player.cards:
      costNeed = slab.costIndexNeeded(card)
      if costNeed != -1 and costs[costNeed]:
        blockedIds += [card.id]
        costs[costNeed] -= 1
    if sum(costs) == 0 or len(blockedIds) == len(self.player.cards):
      return []
    else:
      needed = []
      for player in self.game.players:
        if player.id != self.player.id:
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
    if self.player.canBuySlab(None, slab.costs, slab.type):
      return 0
    best = 999
    for place in self.player.getPossiblePlaces(slab):
      best = min(self.getMark(slab, place, self.player.board), best)
    return best

  def getPreferredSlabCards(self):
    res = []
    for specialSlab in self.game.specialMarket:
      if not specialSlab.isRisk and self.player.color == specialSlab.type and self.game.canSlabBeBought(specialSlab):
        if self.player.canBuySlab(None, specialSlab.costs, specialSlab.type):
          return []
        res += self.getCardsConfig(specialSlab)

    best = 999

    slabs = self.game.normalMarket.copy()
    slabs.sort(key=lambda x: self.getBestSlabMark(x))

    for slab in slabs:
      mark = self.getBestSlabMark(slab) == 0
      if mark <= best and self.player.canBuySlab(None, slab.costs, slab.type):
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
  
  def getRandomCards(self, player, excludedCards, number):
    res = []
    i = 0
    cards = player.cards.copy()
    while len(res) < number and i < len(player.cards): 
      card = cards[i]
      i += 1
      if findIndexById(excludedCards, card.id) == -1:
        res.append(card)

    return res

  def processOffer(self, actualPlayer, botPlayer, blockedCards, requestedCards, slab):
    self.player = botPlayer

    posibleCards = list(filter(lambda c: findIndex(blockedCards, c) == -1, actualPlayer.cards))
    
    cardConfigurations = self.getPreferredCards()

    if len(requestedCards) > len(posibleCards):
      return {
        'status': 'DENIED',
      }

    firstSlabOption = findByFunc(cardConfigurations, lambda c, i, arr: c['slab'].id != slab.id);

    if not firstSlabOption \
      or findIndex(self.game.players, actualPlayer) > findIndex(self.game.players, botPlayer):
      return {
        'status': 'ACCEPTED',
        'selected': self.getRandomCards(actualPlayer, blockedCards, len(requestedCards))
      }

    playerOption = findByFunc(firstSlabOption['needed'], lambda opt, i, arr: opt['playerId'] == actualPlayer.id and len(opt['cardIds']) <= len(requestedCards))

    if playerOption == None \
    or apply(playerOption['cardIds'], lambda prev, cId: prev or findIndexById(blockedCards, cId) != -1, False) \
    or (not slab.isRisk and apply(firstSlabOption['blockedIds'], lambda prev, cId: prev or findIndexById(requestedCards, cId) != -1, False)):  
      return {
        'status': 'DENIED',
      }

    return {
      'status': 'ACCEPTED',
      'selected': playerOption['cardIds'],
    }
    
  def askOffer(self, actualPlayer, tradePlayer, actualPlayerCards, tradePlayerCards):
    self.player = tradePlayer
    
    slabToBuy = self.getPossibleSlabsToBuy()
    tradeSlabToBuy = self.getPossibleSlabsToBuy(list(filter(lambda c: findIndexById(tradePlayerCards, c) == -1, self.player.cards)) + actualPlayerCards)

    if findIndex(self.game.players, actualPlayer) > findIndex(self.game.players, tradePlayer) \
      or slabToBuy == None \
      or slabToBuy != None and tradeSlabToBuy != None and slabToBuy['mark'] <= tradeSlabToBuy['mark']:
      return {
        'status': 'ACCEPTED',
      }

    return {
      'status': 'DENIED',
    }

