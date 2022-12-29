
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
    while(len(riskToResolve) != 0):
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
        return { 'card': card, 'cardId': i  }
    return False

  def getPosibleSlabsToBuy(self):
    bot = self.game.getActualPlayer()
    res = []
    # !hay que tener en cuenta las posiciones ocupadas del tablero y devolver las slabs en orden de preferencia
    for slabIndex in range(self.game.normalMarket):
      if bot.canBuySlab(self.game.normalMarket[slabIndex].costs):
        
        res += [{'targetSlabId': slabIndex, mark: 0, pos: [0, 0], rotation: 0, cards: []}]
    return res

  def buyPlaceSlab(self):
    slabsToBuy = self.getPosibleSlabsToBuy()
    if len(slabsToBuy) == 0:
      return False
    targetSlabId, mark, pos, rotation, cards = slabsToBuy.pop(0)
    self.game.moveSlab(targetSlabId, pos, rotation, cards)
    return True

  def computeCards(self):
    bot = self.game.getActualPlayer()
