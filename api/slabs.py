import random
import json

cardTypes = [
  'domain',
  'compSci',
  'math',
]

def getPointsValue(slab):
  if isinstance(slab, NormalSlab):
    return random.randint(0, 1)
  if isinstance(slab, SilverSlab):
    return random.randint(1, 2)
  if isinstance(slab, GoldSlab):
    return random.randint(2, 3)
  if isinstance(slab, SpecialSlab):
    return random.randint(3, 4)
  if isinstance(slab, Risk):
    return 4
  return 0


def getCosts():
  total = random.randint(1, 4)
  blue = random.randint(0, total)
  red = random.randint(0, total - blue)
  green = total - blue - red
  return [blue, red, green]

def getRiskFixCardType(type):
  if type == 'cmplxModel':
    return 'simpModel'
  
  if type == 'dngData':
    return 'protData'
  
  if type == 'noData':
    return 'dataBase'
  
  if type == 'oldSW':
    return 'openSource'
  
  if type == 'oldTech':
    return 'newTech'
  
  if type == 'slowModel':
    return 'fastModel'
  
  if type == 'virus':
    return 'antivirus'
  
  if type == 'workingAlone':
    return 'teamSpirit'
  
  if type == 'wrongModel':
    return 'rightModel'
  
  return ''

class Risk:
  def __init__(self, id, type, costs):
    self.id = id
    self.puntos = getPointsValue(self)
    self.costs = costs
    self.type = type
    self.needed = getRiskFixCardType(type)
    self.isRisk = True
    self.isSpecial = True

  def isCardNeeded(self, card):
    return card.subType == self.needed

class Slab:
  id = 0
  def __init__(self, links, type = ''):
    Slab.id += 1
    self.id = Slab.id
    self.points = getPointsValue(self)
    self.costs = getCosts()
    self.rotation = 0
    self.links = links
    self.type = type
    self.isRisk = False
    self.isSpecial = False

  def reCalculeId(self):
    Slab.id += 1
    self.id = Slab.id

  def getRotatedLinks(self, rotation):
    #arriba,derecha,abajo,izquierda
    result = self.links.copy()
    for _ in range(rotation):
      result.insert(0, result.pop(-1))
    return result

  def ApplyRotation(self):
    #arriba,derecha,abajo,izquierda
    result = self.links.copy()
    for _ in range(self.rotation):
      result.insert(0, result.pop(-1))
    return result

  def isCardNeeded(self, card):
    for c in range(len(self.costs)):
      if card.type == cardTypes[c] and self.costs[c]:
        return True
    return False

  def toJSON(self):
    return json.loads(json.dumps(self, default=lambda o: getattr(o, '__dict__', str(o))))


class NormalSlab(Slab):
  def __init__(self, linkers):
    super().__init__(linkers, 'NORMAL')

class SilverSlab(Slab):
  def __init__(self, linkers):
    super().__init__(linkers, 'SILVER')

class GoldSlab(Slab):
  def __init__(self, linkers):
    super().__init__(linkers, 'GOLD')

class SpecialSlab(Slab):
  def __init__(self, type, title, descriptionKey, costs):
    super().__init__([1, 1, 1, 1], type)
    self.descriptionKey = descriptionKey
    self.costs = costs
    self.title = title
    self.isRisk = False
    self.isSpecial = True

blueTitle = ['bigData', 'goalsDef','dataUnderstanding']
blueDescription = ['lotOfData', 'questionAnswer', 'dataOkey']
blueCosts = [[2, 1, 0], [1, 0, 1], [2, 0, 2]]

class SpecialBlue(SpecialSlab):
  def __init__(self, type):
    super().__init__('BLUE', blueTitle[type], blueDescription[type], blueCosts[type])

redTitle = ['patternRecognition', 'outlierDetection', 'modelEvaluation']
redDescription = ['patternsInData', 'strangeData', 'modelGood']
redCosts = [[0, 1, 2], [1, 0, 1], [2, 1, 1]]

class SpecialRed(SpecialSlab):
  def __init__(self, type):
    super().__init__('RED' ,redTitle[type], redDescription[type], redCosts[type])

yellowTitle = ['graficalExploring', 'numericalExploring','dataCleaning']
yellowDescription = ['graphicalTools', 'mathematicalTools', 'dataAnalysis']
yellowCosts = [[0, 1, 1], [0, 1, 2], [1, 2, 1]]

class SpecialYellow(SpecialSlab):
  def __init__(self, type):
    super().__init__('YELLOW', yellowTitle[type], yellowDescription[type], yellowCosts[type])

greenTitle = ['mobileApplication', 'storytelling', 'deployment']
greenDescription = ['phoneApp', 'userResults', 'finalProduct']
greenCosts = [[1, 2, 0], [2, 1, 1], [0, 1, 1]]

class SpecialGreen(SpecialSlab):
  def __init__(self, type):
    super().__init__('GREEN', greenTitle[type], greenDescription[type], greenCosts[type])