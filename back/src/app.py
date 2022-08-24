from flask import Flask, jsonify, request
from flask_cors import CORS

from Game import *

flask_app = Flask(__name__)
CORS(flask_app)

game = None

@flask_app.route("/hello/<name>", methods=["GET"])
def hello(name):
    # cache['foo'] = cache['foo'] + [len(cache['foo'])]
    # return jsonify(cache['foo'])
    return jsonify(game['data'])

@flask_app.route('/startGame', methods=['GET'])
def startGame():
    #request_data = request.get_json()
    #return jsonify(request_data)
    
    game = Game()
    return jsonify(game.toJSON())
    
