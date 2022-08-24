import json

class Card(object):
  def __init__(self, type):
    self.selected = False
    self.type = type
    
  def toJSON(self):
    return json.loads(json.dumps(self, default=lambda o: getattr(o, '__dict__', str(o))))
