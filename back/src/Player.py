import json

from slabs import *

class Player:
  def __init__(self, id, name, start, type = 0):
    self.id = id
    self.name = name
    self.type = type
    self.points = 0
    self.cards = []
    self.board = [[None for i in range(4) ] for i in range(4)]
    self.board[start][0] = Slab([1, 1, 1, 1], 'Start_' + str(id))
    if (id == 0):
      self.board[start][0].isHere = True
      
  def toJSON(self):
    return json.loads(json.dumps(self, default=lambda o: getattr(o, '__dict__', str(o))))