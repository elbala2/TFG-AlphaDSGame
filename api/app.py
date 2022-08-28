from flask import Flask, jsonify, request
from flask_cors import CORS

from Game import *

flask_app = Flask(__name__)
CORS(flask_app)

game = None

def toJSON(obj):
  return json.loads(json.dumps(obj, default=lambda o: getattr(o, '__dict__', str(o))))

@flask_app.route("/hello/<name>", methods=["GET"])
def hello(name):
  # cache['foo'] = cache['foo'] + [len(cache['foo'])]
  # return jsonify(cache['foo'])
  return jsonify(game['data'])

@flask_app.route('/startGame', methods=['PUT'])
def startGame():
  game = Game()
  if bool(request.get_json()):
    players, start = request.get_json().values()
    game.setConfig(players, start)
  return jsonify(game.toJSON())

@flask_app.route('/moveSlab', methods=['POST'])   
def moveSlab():
  origin, destiny, cards = request.get_json()
  game.moveSlab(origin, destiny, cards)
  return jsonify(game.players[game.actualPlayer].toJSON())

@flask_app.route('/nextTurn', methods=['GET'])   
def nextTurn():
  game.nextTurn()
  return jsonify(game.players[game.actualPlayer].toJSON())

@flask_app.route('/tradeCards', methods=['POST'])   
def tradeCards():
  player1ID, cards1, player2ID, cards2 = request.get_json()
  game.tradeCards(player1ID, cards1, player2ID, cards2)
  return jsonify(toJSON(game.players))