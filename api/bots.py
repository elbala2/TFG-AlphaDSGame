
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
        res += [riskIndex]
    return res

  def resolveRisks(self, game):
    riskToResolve = self.getRiskToResolve(game)
    if len(riskToResolve) == 0:
      return False
    hecho = False
    while (len(riskToResolve) != 0):
      targetRiskId, cards = riskToResolve.pop(0)
      if bot.canSolveRisk(risk):
        hecho = True
        game.fix(targetRiskId, cards)

    return hecho

  def getDistance(self, x, y):
    return abs(2 - x) + y

  def getMark(self, slab, place, cards):
    mark = 0
    mark += slab.points * 10
    mark += self.getDistance(place['pos'][0], place['pos'][1])
    links = slab.ApplyRotation()
    if place['pos'][0] == 2 and place['pos'][1] == 0:
      mark += 40
    if links[0] == 1 and 0 <= place['pos'][1]-1 <= 3:
      mark += self.getDistance(place['pos'][0], place['pos'][1]-1) + 1
    else:
      mark += 8
    if links[1] == 1 and 0 <= place['pos'][0]+1 <= 3:
      mark += self.getDistance(place['pos'][0]+1, place['pos'][1]) + 1
    else:
      mark += 8
    if links[2] == 1 and 0 <= place['pos'][1]+1 <= 3:
      mark += self.getDistance(place['pos'][0], place['pos'][1]+1)
    else:
      mark += 8
    if links[3] == 1 and 0 <= place['pos'][0]-1 <= 3:
      mark += self.getDistance(place['pos'][0]-1, place['pos'][1])
    else:
      mark += 8
    mark += len(cards)
    return mark
    
  def getPosibleSlabsToBuy(self, game):
    bot = game.getActualPlayer()
    res = []
    for slabIndex in range(len(game.normalMarket)):
      slab = game.normalMarket[slabIndex]
      if bot.canBuySlab(None, slab.costs):
        cards = bot.getCards(slab)
        for place in bot.getPosiblePlaces(slab):
          res += [{
              'targetSlabId': slabIndex,
              'mark': self.getMark(slab, place, cards),
              'pos': place['pos'],
              'rotation': place['rotation'],
              'cards': cards,
          }]
    res.sort(key=lambda elem: elem['mark'] , reverse=True)
    print(res)
    return res

  def buyPlaceSlab(self, game):
    slabsToBuy = self.getPosibleSlabsToBuy(game)
    if len(slabsToBuy) == 0:
      return False
    targetSlabId, mark, pos, rotation, cards = slabsToBuy.pop(0).values()
    game.moveSlab(targetSlabId, [pos[0], pos[1]], rotation, cards)
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
        types = []
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
    
    game.discard(cardIds)
    return True
