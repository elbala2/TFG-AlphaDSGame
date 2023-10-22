import random

from config import (  
  NORMAL,
  SILVER,
  GOLD,
  cardTypes,
  risksKeys,
)

def getCosts():
  total = random.randint(1, 4)
  blue = random.randint(0, total)
  red = random.randint(0, total - blue)
  green = total - blue - red
  return [blue, red, green]

class Risk:
  id = 0
  
  def __init__(self, type):
    Risk.id += 1
    self.id = Risk.id
    self.points = 4
    self.costs = random.randint(1, 2)
    self.type = type
    self.needed = risksKeys[type]
    self.isRisk = True
    self.isSpecial = True

  def isCardNeeded(self, card):
    return card.subType == self.needed

class Slab:
  id = 0
  
  def __init__(self, links, type = NORMAL):
    Slab.id += 1
    self.id = Slab.id
    self.points = 0
    self.costs = getCosts()
    self.rotation = 0
    self.links = links
    self.type = type
    self.isRisk = False
    self.isSpecial = False

    if type == NORMAL:
      self.points = random.randint(0, 1)
    if type == SILVER:
      self.points = random.randint(1, 2)
    if type == GOLD:
      self.points = random.randint(2, 3)

  def reEvaluateId(self):
    Slab.id += 1
    self.id = Slab.id

  def getRotatedLinks(self, rotation):
    #arriba,derecha,abajo,izquierda
    result = self.links.copy()
    for _ in range(rotation):
      result.insert(0, result.pop(-1))
    return result

  def applyRotation(self):
    #arriba,derecha,abajo,izquierda
    return self.getRotatedLinks(self.rotation)

  def isCardNeeded(self, card):
    cardTypesKeys = cardTypes.keys()
    for i in range(len(cardTypesKeys)):
      if self.costs[i] and card.type == cardTypesKeys[i]:
        return True
    return False

class SpecialSlab(Slab):
  def __init__(self, type, title, descriptionKey, costs):
    super().__init__([1, 1, 1, 1], type)
    self.descriptionKey = descriptionKey
    self.costs = costs
    self.title = title
    self.isRisk = False
    self.isSpecial = True
    
    self.points = random.randint(3, 4)

