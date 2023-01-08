
class Bot:

  def __init__(self, game):
    self.game = game
    self.brain = None
    self.name_mental_state = None

    # TODO
    # self.field_size = self.game.configuration['game_parameters']['field_size']
    # self.max_cards_in_hand = self.game.configuration['game_parameters']['max_num_cards']
    # self.max_num_tiles = self.game.configuration['intelligence']['max_num_tiles']
    # self.max_possible_path = self.game.configuration['intelligence']['max_possible_path']
    # self.alpha_board = self.game.configuration['intelligence']['alpha_board']
    # self.alpha_hand = self.game.configuration['intelligence']['alpha_hand']
    # self.learning_rate = self.game.configuration['intelligence']['learning_rate']
    # self.reward = self.game.configuration['intelligence']['reward']
    # self.max_relevance = self.game.configuration['intelligence']['max_relevance']
    # self.min_relevance = self.game.configuration['intelligence']['min_relevance']
    # self.initial_relevance = 1/2 * (self.max_relevance - abs(self.min_relevance))

  def getRiskToResolve(self):
    bot = self.game.getActualPlayer()
    res = []
    for riskIndex in range(game.specialMarket):
      if game.specialMarket[riskIndex].isRisk and bot.canSolveRisk(game.specialMarket[riskIndex]):
        res += [riskIndex]
    return res

  def resolveRisks(self):
    riskToResolve = self.getRiskToResolve()
    if len(riskToResolve) == 0:
      return False
    while (len(riskToResolve) != 0):
      targetRiskId, cards = riskToResolve.pop(0)
      if bot.canSolveRisk(risk):
        self.game.fix(targetRiskId, cards)

    return True

  def findCard(self, bot, type):
    for i in len(bot.cards):
      card = bot.cards[i]
      if type == 1 and card.type[0] == 'Mathematics' \
              or type == 2 and card.type[0] == 'Computer Science'\
              or type == 3 and card.type[0] == 'Domain':
        return {'card': card, 'cardId': i}
    return False

  def getMark(self, slab, place, cards):
    mark = 0
    mark += slab.points * 0.6
    mark -= pow(pow(0 + place.pos[0], 2) +
                pow(2 + place.pos[1], exp), 1/2) * 0.6
    mark -= len(cards) * 0.2
    return mark
    
  def getPosibleSlabsToBuy(self):
    bot = self.game.getActualPlayer()
    res = []
    for slabIndex in range(self.game.normalMarket):
      slab = self.game.normalMarket[slabIndex]
      if bot.canBuySlab(None, slab.costs):
        cards = bot.getCards(slab)
        for place in bot.getPosiblePlaces(slab):
          res += [{
              targetSlabId: slabIndex,
              mark: self.getMark(slab, place, cards),
              pos: place.pos,
              rotation: place.rotation,
              cards: cards,
          }]
    return res.sort(key=lambda elem: elem['mark'] , reverse=True)

  def buyPlaceSlab(self):
    slabsToBuy = self.getPosibleSlabsToBuy()
    if len(slabsToBuy) == 0:
      return False
    targetSlabId, mark, pos, rotation, cards = slabsToBuy.pop(0)
    self.game.moveSlab(targetSlabId, pos, rotation, cards)
    return True

  def computeCards(self):
    bot = self.game.getActualPlayer()
    # ! Tiene que seleccionar las cartas a descartar
    cardIds = []
    risks = []
    if self.game.hasRisk:
      risks = list(filter(lambda slab: slab.isRisk, self.game.specialMarket))
    for card in bot.cards:
      if self.game.hasRisk:
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
    
    self.game.discard(cardIds)
    
    
