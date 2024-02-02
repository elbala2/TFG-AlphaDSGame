from flask import Blueprint

from src.services.GameService import GameService

base = Blueprint('game_routes', __name__)

@base.route('/')
def test():
  return GameService.createGame('tipo 1')