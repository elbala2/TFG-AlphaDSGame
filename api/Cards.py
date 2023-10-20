import json

class Card(object):
  def __init__(self, id, selected, cardType, cardSubtype):
    self.id = id
    self.selected = selected
    self.type = cardType
    self.subType = cardSubtype