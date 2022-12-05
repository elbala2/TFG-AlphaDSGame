
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
    
  def getRiskToResolve(self, player):
    res = []
    for riskIndex in range(game.specialMarket):
      if game.specialMarket[riskIndex].isRisk:
        if player.canSolveRisk(game.specialMarket[riskIndex]):
          res += [riskIndex]
    return res
  
  def solveRisk(self, player, riskId, risk):
    cardsAux = player.cards.copy()
    for i in range(risk.costs):
      for cardId in range(cardsAux):
        card = player.cards[cardId]
        if card.type[1] == getRiskFixCardType(risk)
          cardsAux = cardsAux[:cardId] + cardsAux[cardId + 1:]
          break
    player.cards = cardsAux
    game.specialMarket = game.specialMarket[:riskId] + game.specialMarket[riskId + 1:]

  def resolveRisks(self):
    player = self.game.getActualPlayer()
    riskToResolve = self.getRiskToResolve(player)
    if len(riskToResolve) == 0:
      return False
    while(len(riskToResolve) != 0):
      targetRisk = riskToResolve.pop(0)
      risk = self.game.specialMarket[targetRisk]
      if player.canSolveRisk(risk):
        self.solveRisk(player, targetRisk, risk)
      
    return True
  
  def getPosibleSlabsToBuy(self, player):
    res = []
    #Todo hay que tener en cuenta las posiciones ocupadas del tablero y devolver las slabs en orden de preferencia
    for slabIndex in range(self.game.normalMarket):
      if player.canBuySlab(self.game.normalMarket[slabIndex].costs):
        res += [{ 'targetSlabId': slabIndex, mark: 0, pos: [0, 0] }]
    return res

  def buySlab(self, player, slabId, slab):
    pass

  def buyPlaceSlab(self):
    player = self.game.getActualPlayer()
    slabsToBuy = self.getPosibleSlabsToBuy(player)
    if len(slabsToBuy) == 0:
      return False
    targetSlabId, mark, pos = slabsToBuy.pop(0)
    slab = self.game.normalMarket[targetSlab]
    if player.canBuySlab(slab.costs):
      self.buySlab(player, targetRisk, risk)
    return True
  
  def computeCards(self):
    pass
  