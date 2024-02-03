import random
import uuid

from src.utils.GameConfig import (  
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

def getSlabPoints(slab):
  if isinstance(slab, SpecialSlab):
    return random.randint(3, 4)
  elif isinstance(slab, Slab):
    if slab.type == NORMAL:
      return random.randint(0, 1)
    elif slab.type == SILVER:
      return random.randint(1, 2)
    elif slab.type == GOLD:
      return random.randint(2, 3)
    else:
      return 0

class Risk:
  def __init__(self,
    riskType,
    riskId = None,
    costs = None,
  ):
    if riskId == None:
      self.id = uuid.uuid4().__str__()
    else:
      self.id = riskId

    if costs == None:
      self.costs = random.randint(1, 2)
    else:
      self.costs = costs

    self.type = riskType
    self.needed = risksKeys[riskType]
    self.points = 4
    self.isRisk = True
    self.isSpecial = True

  def costIndexNeeded(self, card):
    if card.subType == self.needed:
      return 0
    return - 1

class Slab:
  def __init__(self,
    links,
    slabId = None,
    slabType = NORMAL,
    costs = None,
    points = None,
    rotation = 0
  ):
    if slabId == None:
      self.id = uuid.uuid4().__str__()
    else:
      self.id = slabId

    if costs == None:
      self.costs = getCosts()
    else:
      self.costs = costs

    self.type = slabType
    self.links = links
    self.rotation = rotation
    self.isRisk = False
    self.isSpecial = False

    if points == None:
      self.points = getSlabPoints(self)
    else:
      self.points = points

  def reEvaluateId(self):
    self.id = uuid.uuid4().__str__()

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
  def __init__(self,
    slabType,
    title,
    descriptionKey,
    slabId = None,
    costs = None,
    points = None,
  ):
    super().__init__(
      links=[1,1,1,1],
      costs=costs,
      slabId=slabId,
      slabType=slabType,
      points=points,
    )
    self.title = title
    self.descriptionKey = descriptionKey

    self.isSpecial = True


def dictToSlab(dict):
  if dict == None:
    return None

  if dict['isRisk']:
    return Risk(
      riskId=dict['id'],
      riskType=dict['type'],
      costs=dict['costs'],
    )

  elif dict['isSpecial']:
    return SpecialSlab(
      slabId=dict['id'],
      slabType=dict['type'],
      costs=dict['costs'],
      points=dict['points'],
      title=dict['title'],
      descriptionKey=dict['descriptionKey']
    )

  else:
    return Slab(
      slabId=dict['id'],
      slabType=dict['type'],
      costs=dict['costs'],
      links=dict['links'],
      points=dict['points'],
      rotation=dict['rotation'],
    )