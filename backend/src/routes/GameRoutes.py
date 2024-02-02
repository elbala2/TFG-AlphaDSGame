from flask import Blueprint

from src.services.GameService import GameService
from src.utils.json import toJSON

base = Blueprint('game_routes', __name__)

@base.route('/')
def test():
  game = GameService.getGame('6651fc78-6e12-4ab3-a682-7e7f387a9a92')
  return toJSON(game)