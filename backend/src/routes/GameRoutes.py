from flask import Blueprint, jsonify, request
from flask_cors import cross_origin
from src.models.Game import Game
from src.models.Cards import dictToCard

from src.services.GameService import GameService

from src.utils.json import toJSON

base = Blueprint('game_routes', __name__)

@base.route('/new', methods=['POST'])
def startGame():
  params = request.get_json()

  if (not params):
    raise Exception('gameType and players required')

  game = Game(
    gameType = params['gameType'],
    players = params['players'],
  )

  GameService.storeGame(game)
  return toJSON(game)

@base.route('/<gameId>', methods=['GET'])
def getGameEndpoint(gameId):
  game = GameService.getGame(gameId)
  return toJSON(game)

@base.route('/<gameId>/slabs/<slabID>/move', methods=['PUT'])   
def moveSlab(gameId, slabID):
  params = request.get_json()

  if (not params):
    raise Exception('destiny, rotation and cards required')
  
  destiny = params['destiny']
  rotation = params['rotation']
  cards = [dictToCard(c) for c in list(filter(lambda f: f['selected'] == True, params['cards']))]

  game = GameService.getGame(gameId)
  game.moveSlab(
    slabID,
    destiny,
    rotation,
    cards,
  )
  GameService.updateGame(game)
  return toJSON({
    'player': game.getActualPlayer(),
    'normalMarket': game.normalMarket,
    'specialMarket': game.specialMarket,
  })

@base.route('/<gameId>/players/next', methods=['GET'])
def nextTurn(gameId):
  game = GameService.getGame(gameId)
  game.nextTurn()
  GameService.updateGame(game)
  return toJSON(game)

@base.route('/<gameId>/cards/trade', methods=['PUT'])   
def tradeCards(gameId):
  params = request.get_json()

  if (not params):
    raise Exception('destiny, rotation and cards required')
  
  player1Id = params['player1Id']
  cards1 = [dictToCard(c) for c in list(filter(lambda f: f['selected'] == True, params['cards1']))]
  player2Id = params['player2Id'] 
  cards2 = [dictToCard(c) for c in list(filter(lambda f: f['selected'] == True, params['cards2']))]

  if (len(cards1) != len(cards2)):
    raise Exception('Not same cards len')

  game = GameService.getGame(gameId)
  game.tradeCards(
    player1Id,
    cards1,
    player2Id,
    cards2,
  )
  GameService.updateGame(game)
  return toJSON({ 'players': game.players })

@base.route('/<gameId>/cards/<cardID>/discard', methods=['PUT'])   
def discard(gameId, cardID):
  game = GameService.getGame(gameId)
  game.discard(cardID)
  GameService.updateGame(game)
  return toJSON({
    'cards': game.getActualPlayer().cards,
  })

@base.route('/<gameId>/fix/<riskId>', methods=['PUT'])   
def fix(gameId, riskId):
  params = request.get_json()

  if (not params):
    raise Exception('destiny, rotation and cards required')

  cards = [dictToCard(c) for c in list(filter(lambda f: f['selected'] == True, params['cards']))]

  game = GameService.getGame(gameId)
  game.fix(riskId, cards)
  GameService.updateGame(game)
  return toJSON({
    'players': game.players,
    'specialMarket': game.specialMarket,
  })

@base.route('/<gameId>/bot/action', methods=['GET'])
def bot_moves(gameId):
  game = GameService.getGame(gameId)
  hecho = game.botAction()
  GameService.updateGame(game)

  if hecho != True:
    return toJSON(hecho)
  return toJSON(game)
