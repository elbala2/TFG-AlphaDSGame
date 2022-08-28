import json

class Card(object):
  i = 0
  def __init__(self, type):
    self.id = Card.i
    self.selected = False
    self.type = type
    Card.i += 1
    
  def toJSON(self):
    return json.loads(json.dumps(self, default=lambda o: getattr(o, '__dict__', str(o))))
