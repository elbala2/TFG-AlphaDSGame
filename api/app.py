from flask import Flask, jsonify, request, session
from flask_cors import CORS
import pickle
import json
from collections import namedtuple
import random
import mysql.connector

from Game import *
from Cards import *

app = Flask(__name__)
CORS(app)

password = 'kiralinda101'
database = 'tfg'

def getSQLCursor():
  connection = mysql.connector.connect(host='localhost',user='root',passwd=password,database=database); 
  return connection.cursor(buffered = True)

def storeGameV2(id, game):
  connection = mysql.connector.connect(host='localhost',user='root',passwd=password,database=database); 
  cursor = connection.cursor(buffered = True)
  cursor.execute("insert into tfg.Games values ( %s, %s );", [id, pickle.dumps(game)])
  connection.commit()

def storeGame(id, game):
  with open('../data/' + str(id) + '_game', 'wb') as dataFile:
    pickle.dump(game, dataFile)

def getGame(id):
  with open('../data/' + str(id) + '_game', 'rb') as dataFile:
    return pickle.load(dataFile)

def toJSON(obj):
  return json.loads(json.dumps(obj, default=lambda o: getattr(o, '__dict__', str(o))))

@app.route('/startGame', methods=['PUT'])
def startGame():
  id = random.randint(0, 1000000)
  game = Game()
  if bool(request.get_json()):
    players, start = request.get_json().values()
    game.setConfig(players, start)
  storeGame(id, game)
  print(storeGameV2(id, game))
  return jsonify(toJSON(game))

@app.route('/getGame/<id>', methods=['GET'])
def getGameEndpoint(id):
  try:
    game = getGame(id)
  except Exception:
    game = Game()
  return jsonify(toJSON(game))

@app.route('/moveSlab/<id>', methods=['POST'])   
def moveSlab(id):
  game = getGame(id)
  origin, destiny, rotation, cards = request.get_json().values()
  game.moveSlab(origin, destiny, rotation, [namedtuple('Card', c.keys())(*c.values()) for c in list(filter(lambda f: f['selected'] == True, cards))])
  storeGame(game)
  return jsonify(toJSON({ 'player': game.players[game.actualPlayer], 'normalMarket': game.normalMarket, 'specialMarket': game.specialMarket }))

@app.route('/nextTurn/<id>', methods=['GET'])   
def nextTurn(id):
  game = getGame(id)
  game.nextTurn()
  storeGame(game)
  return jsonify(toJSON(game))

@app.route('/tradeCards/<id>', methods=['POST'])   
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
    storeGame(game)
    return jsonify(toJSON({ 'players': game.players }))
  raise Exception('Not same len')

@app.route('/discard/<id>/<cardID>', methods=['GET'])   
def discard(id, cardID):
  game = getGame(id)
  game.discard(cardID)
  storeGame(game)
  return jsonify(toJSON({ 'cards': game.players[game.actualPlayer].cards }))

@app.route('/fix/<id>', methods=['POST'])   
def fix(id):
  game = getGame(id)
  slabID, cards = request.get_json().values()
  game.fix(slabID, [namedtuple('Card', c.keys())(*c.values()) for c in list(filter(lambda f: f['selected'] == True, cards))])
  storeGame(game)
  return jsonify(toJSON({ 'players': game.players, 'specialMarket': game.specialMarket }))

@app.route('/bot/<id>', methods=['GET'])
def bot_moves(id):
  game = getGame(id)
  hecho = game.botAction()
  storeGame(game)
  if hecho != True:
    return jsonify(toJSON(hecho))
  return jsonify(toJSON(game))

