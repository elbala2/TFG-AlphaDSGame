
class Bot:
  def __init__(self):
    self.brain = None
    self.name_mental_state = None

    # TODO
    # self.field_size = game.configuration['game_parameters']['field_size']
    # self.max_cards_in_hand = game.configuration['game_parameters']['max_num_cards']
    # self.max_num_tiles = game.configuration['intelligence']['max_num_tiles']
    # self.max_possible_path = game.configuration['intelligence']['max_possible_path']
    # self.alpha_board = game.configuration['intelligence']['alpha_board']
    # self.alpha_hand = game.configuration['intelligence']['alpha_hand']
    # self.learning_rate = game.configuration['intelligence']['learning_rate']
    # self.reward = game.configuration['intelligence']['reward']
    # self.max_relevance = game.configuration['intelligence']['max_relevance']
    # self.min_relevance = game.configuration['intelligence']['min_relevance']
    # self.initial_relevance = 1/2 * (self.max_relevance - abs(self.min_relevance))

  def getRiskToResolve(self, game):
    bot = game.getActualPlayer()
    res = []
    for riskIndex in range(len(game.specialMarket)):
      if game.specialMarket[riskIndex].isRisk and bot.canSolveRisk(game.specialMarket[riskIndex]):
        res += [{
          'targetRiskId': riskIndex,
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
      if bot.canSolveRisk(game.specialMarket[targetRiskId]):
        hecho = True
        game.fix(targetRiskId, cards)

    return hecho

  def getDistance(self, x, y):
    return abs(2 - x) + abs(-1 - y)

  def dirMark(self, link, x, y, direction, board):
    distance = self.getDistance(x, y)
    pointingInside = (0 <= x <= 3 and 0 <= y <= 3)
    if link:
      if not pointingInside:
        return distance * 2
      if board[x][y] == None:
        return distance
      if board[x][y].ApplyRotation()[direction]:
        return -distance
    if pointingInside and board[x][y] != None and board[x][y].ApplyRotation()[direction]:
      return distance * 2
    return 0

  def getMark(self, slab, place, cards, board):
    mark = 0
    x = place['pos'][0]
    y = place['pos'][1]
    mark -= slab.points * 4
    links = slab.ApplyRotation()
    mark -= self.getDistance(x, y)
    if x == 2 and y == 0:
      mark -= 40
    mark += self.dirMark(links[0] == 1, x, y - 1, 2, board)
    mark += self.dirMark(links[1] == 1, x + 1, y, 3, board)
    mark += self.dirMark(links[2] == 1, x, y + 1, 0, board)
    mark += self.dirMark(links[3] == 1, x - 1, y, 1, board)
    mark += len(cards)
    return mark

  def computeSlab(self, game, slabIndex, slab):
    bot = game.getActualPlayer()
    res = []
    if bot.canBuySlab(None, slab.costs):
      cards = bot.getCards(slab)
      for place in bot.getPosiblePlaces(slab):
        slab.rotation = place['rotation']
        res += [{
          'targetSlabId': slabIndex,
          'mark': self.getMark(slab, place, cards, bot.board),
          'pos': place['pos'],
          'rotation': place['rotation'],
          'cards': cards,
        }]
        
    return res

  def getPosibleSlabsToBuy(self, game):
    typeOptions = ['RED', 'GREEN', 'BLUE', 'YELLOW']
    res = []
    for slabIndex in range(len(game.normalMarket)):
      slab = game.normalMarket[slabIndex]
      res += self.computeSlab(game, slabIndex,  slab)

    for slabIndex in range(4, len(game.specialMarket) + 4):
      slab = game.specialMarket[slabIndex - 4]
      if not slab.isRisk and slab.type == typeOptions[game.actualPlayer]:
        res += self.computeSlab(game, slabIndex, slab)
      
    res.sort(key=lambda elem: elem['mark'])
    for x in res:
      print(x)
    return res

  def buyPlaceSlab(self, game):
    if len(list(filter(lambda slab: slab.isRisk, game.specialMarket))) != 0:
      return False
    slabsToBuy = self.getPosibleSlabsToBuy(game)
    if len(slabsToBuy) == 0:
      return False
    targetSlabId, mark, pos, rotation, cards = slabsToBuy.pop(0).values()
    game.moveSlab(targetSlabId, [pos[1], pos[0]], rotation, cards)
    return True

  def computeCards(self, game):
    bot = game.getActualPlayer()
    cardIds = []
    risks = []
    if game.hasRisk:
      risks = list(filter(lambda slab: slab.isRisk, game.specialMarket))
    for card in bot.cards:
      if game.hasRisk:
        needed = False
        for risk in risks:
          if card.type[1] == getRiskFixCardType(risk):
            needed = True
            break
        if not needed:
          cardIds += card.id
      else:
        types = [0,0,0]
        if card.type[0] == 'Domain':
          if types[0] > 0:
            cardIds += card.id
          else:
            types[0] += 1
        elif card.type[0] == 'Computer Science':
          if types[1] > 0:
            cardIds += card.id
          else:
            types[1] += 1
        else:
          if types[2] > 0:
            cardIds += card.id
          else:
            types[2] += 1
    for cardId in cardIds:
      game.discard(cardId)
    return len(cardIds) != 0
