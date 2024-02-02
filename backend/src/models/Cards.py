import json

class Card(object):
  id = 0
  def __init__(self, cardType, cardSubtype):
    Card.id += 1
    self.id = Card.id
    self.type = cardType
    self.subType = cardSubtype