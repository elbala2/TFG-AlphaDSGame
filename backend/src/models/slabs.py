import random
import uuid

from src.utils.config import (  
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
  def __init__(self,
    riskType,
    riskId = uuid.uuid4().__str__(),
    points = 4,
    costs = random.randint(1, 2),
    isRisk = True,
    isSpecial = True,
  ):
    self.id = riskId
    self.costs = costs
    self.points = points
    self.isRisk = isRisk
    self.isSpecial = isSpecial
    self.type = riskType
    self.needed = risksKeys[riskType]

  def costIndexNeeded(self, card):
    if card.subType == self.needed:
      return 0
    return - 1

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
    result = self.links.copy()
    for _ in range(rotation):
      result.insert(0, result.pop(-1))
    return result

  def applyRotation(self):
    return self.getRotatedLinks(self.rotation)

  def costIndexNeeded(self, card):
    cardTypesKeys = list(cardTypes.keys())
    for i in range(len(cardTypesKeys)):
      if self.costs[i] and card.type == cardTypesKeys[i]:
        return i
    return - 1

class SpecialSlab(Slab):
  def __init__(self, type, title, descriptionKey, costs):
    super().__init__([1, 1, 1, 1], type)
    self.descriptionKey = descriptionKey
    self.costs = costs
    self.title = title
    self.isRisk = False
    self.isSpecial = True
    
    self.points = random.randint(3, 4)
