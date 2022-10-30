import json

class Card(object):
  def __init__(self, id, selected, type):
    self.id = id
    self.selected = selected
    self.type = type

  def toJSON(self):
    return json.loads(json.dumps(self, default=lambda o: getattr(o, '__dict__', str(o))))
