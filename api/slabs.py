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
    super().__init__(linkers)
    self.type = 'NORMAL'

class SilverSlab(Slab):
  def __init__(self, linkers):
    super().__init__(linkers)
    self.type = 'SILVER'

class GoldSlab(Slab):
  def __init__(self, linkers):
    super().__init__(linkers)
    self.type = 'GOLD'

class SpecialSlab(Slab):
  def __init__(self, title, description, costs):
    super().__init__([1, 1, 1, 1])
    self.description = description
    self.costs = costs
    self.title = title
    self.isRisk = False
    self.isSpecial = True

blueTitle = ['Graphical exploring', 'Numerical Exploring','Data Cleaning']
blueDescription = ['Using graphical tools to view your data', 'Using mathematical tools to view your data', 'Preparing your data for analysis']
blueCosts = [[2, 1, 0], [1, 0, 1], [2, 0, 2]]

class SpecialBlue(SpecialSlab):
  def __init__(self, type):
    super().__init__(blueTitle[type], blueDescription[type], blueCosts[type])
    self.type = 'BLUE'

redTitle = ['Pattern Recognition', 'Outlier Detection', 'Model Evaluation']
redDescription = ['Looking for patterns in your data', 'Looking for strange data in your data', 'How good is the model?']
redCosts = [[0, 1, 2], [1, 0, 1], [2, 1, 1]]

class SpecialRed(SpecialSlab):
  def __init__(self, type):
    super().__init__(redTitle[type], redDescription[type], redCosts[type])
    self.type = 'RED'

yellowTitle = ['Graphical exploring', 'Numerical Exploring', 'Data Cleaning']
yellowDescription = ['Using graphical tools to view your data', 'Using mathematical tools to view your data', 'Preparing your data for analysis']
yellowCosts = [[0, 1, 1], [0, 1, 2], [1, 2, 1]]

class SpecialYellow(SpecialSlab):
  def __init__(self, type):
    super().__init__(yellowTitle[type], yellowDescription[type], yellowCosts[type])
    self.type = 'YELLOW'

greenTitle = ['Mobile Application', 'Storytelling', 'Deployment']
greenDescription = ['An app for your mobile phone', 'To present the results to the users', 'To develop the final product']
greenCosts = [[1, 2, 0], [2, 1, 1], [0, 1, 1]]

class SpecialGreen(SpecialSlab):
  def __init__(self, type):
    super().__init__(greenTitle[type], greenDescription[type], greenCosts[type])
    self.type = 'GREEN'