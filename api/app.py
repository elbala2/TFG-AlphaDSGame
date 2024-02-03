from flask import Flask, jsonify, request
from flask_cors import CORS
import pickle
import json
from collections import namedtuple
import mysql.connector

from Game import Game

app = Flask(__name__)
app.debug = True
CORS(app)

password = 'kiralinda101'
database = 'tfg'  

def createGame(game):
  connection = mysql.connector.connect(host='localhost',user='root',passwd=password,database=database); 
  cursor = connection.cursor(buffered = True)
  cursor.execute("insert into tfg.Games (gameState) values ( %s );", [pickle.dumps(game)])
  connection.commit()
  return cursor.lastrowid

def getGame(id):
  connection = mysql.connector.connect(host='localhost',user='root',passwd=password,database=database); 
  cursor = connection.cursor(buffered = True)
  cursor.execute("select gameState from tfg.games where gameId = %s ;", [id])
  connection.commit()
  return pickle.loads(cursor.fetchall()[0][0])

def updateGame(id, game):
  connection = mysql.connector.connect(host='localhost',user='root',passwd=password,database=database); 
  cursor = connection.cursor(buffered = True)
  cursor.execute("update tfg.games set gameState = %s  where gameId = %s ;", [pickle.dumps(game), id])
  connection.commit()

def toJSON(obj):
  return json.loads(json.dumps(obj, default=lambda o: getattr(o, '__dict__', str(o))))

@app.route('/game', methods=['POST'])
def startGame():
  game = Game()
  if bool(request.get_json()):
    players = request.get_json()['players']
    gameType = request.get_json()['gameType']
    game.setConfig(gameType, players)
  createdId = createGame(game)
  game.id = createdId
  updateGame(createdId, game)
  return jsonify(toJSON(game))

@app.route('/game/<id>', methods=['GET'])
def getGameEndpoint(id):
  game = getGame(id)
  return jsonify(toJSON(game))

@app.route('/game/<id>/slabs/<slabID>/move', methods=['PUT'])   
def moveSlab(id, slabID):
  game = getGame(id)
  destiny, rotation, cards = request.get_json().values()
  game.moveSlab(int(slabID), destiny, rotation, [namedtuple('Card', c.keys())(*c.values()) for c in list(filter(lambda f: f['selected'] == True, cards))])
  updateGame(id, game)
  return jsonify(toJSON({ 'player': game.players[game.actualPlayer], 'normalMarket': game.normalMarket, 'specialMarket': game.specialMarket }))

@app.route('/game/<id>/players/next', methods=['GET'])
def nextTurn(id):
  game = getGame(id)
  game.nextTurn()
  updateGame(id, game)
  return jsonify(toJSON(game))

@app.route('/game/<id>/cards/trade', methods=['PUT'])   
def tradeCards(id):
  game = getGame(id)
  player1ID, cards1, player2ID, cards2 = request.get_json().values()
  if (len(cards1) == len(cards2)):
    game.tradeCards(
      player1ID,
      [namedtuple('Card', c.keys())(*c.values()) for c in list(filter(lambda f: f['selected'] == True, cards1))],
      player2ID,
      [namedtuple('Card', c.keys())(*c.values()) for c in list(filter(lambda f: f['selected'] == True, cards2))]
    )
    updateGame(id, game)
    return jsonify(toJSON({ 'players': game.players }))
  raise Exception('Not same len')

@app.route('/game/<id>/cards/<cardID>/discard', methods=['PUT'])   
def discard(id, cardID):
  game = getGame(id)
  game.discard(cardID)
  updateGame(id, game)
  return jsonify(toJSON({ 'cards': game.players[game.actualPlayer].cards }))

@app.route('/game/<id>/fix/<riskID>', methods=['PUT'])   
def fix(id, riskID):
  game = getGame(id)
  cards = request.get_json()['cards']
  game.fix(int(riskID), [namedtuple('Card', c.keys())(*c.values()) for c in list(filter(lambda f: f['selected'] == True, cards))])
  updateGame(id, game)
  return jsonify(toJSON({ 'players': game.players, 'specialMarket': game.specialMarket }))

@app.route('/game/<id>/bot/action', methods=['GET'])
def bot_moves(id):
  game = getGame(id)
  hecho = game.botAction()
  updateGame(id, game)
  if hecho != True:
    return jsonify(toJSON(hecho))
  return jsonify(toJSON(game))
