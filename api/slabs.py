import random
import json

cardTypes = [
  'Domain',
  'Computer Science',
  'Mathematics',
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
  if type == 'Complex Model':
    return 'Simple Model'
  if type == 'Danger Data':
    return 'Protected Data'
  if type == 'No Data':
    return 'Data Base'
  if type == 'Old Software':
    return 'Open Source'
  if type == 'Old Technology':
    return 'New Technology'
  if type == 'Slow Model':
    return 'Fast Model'
  if type == 'Virus':
    return 'Antivirus'
  if type == 'Working Alone':
    return 'Team Spirit'
  if type == 'Wrong Model':
    return 'Right Model'
  return ''

class Risk:
  def __init__(self, id, type, description, costs):
    self.id = id
    self.puntos = getPointsValue(self)
    self.costs = costs
    self.type = type
    self.description = description
    self.needed = getRiskFixCardType(type)
    self.isRisk = True
    self.isSpecial = True

  def isCardNeeded(self, card):
    return card.type[1] == self.needed

class Slab:
  def __init__(self, id, links, type = ''):
    self.id = id
    self.points = getPointsValue(self)
    self.costs = getCosts()
    self.rotation = 0
    self.isHere = False
    self.wasHere = False
    self.links = links
    self.type = type
    self.isRisk = False
    self.isSpecial = False

  def getRotatedLinks(self, rotation):
    #arriba,derecha,abajo,izquierda
    result = self.links.copy()
    for i in range(rotation):
      result.insert(0, result.pop(-1))
    return result

  def ApplyRotation(self):
    #arriba,derecha,abajo,izquierda
    result = self.links.copy()
    for i in range(self.rotation):
      result.insert(0, result.pop(-1))
    return result

  def isCardNeeded(self, card):
    for c in range(len(self.costs)):
      if card.type[0] == cardTypes[c] and self.costs[c]:
        return True
    return False

  def toJSON(self):
    return json.loads(json.dumps(self, default=lambda o: getattr(o, '__dict__', str(o))))


class NormalSlab(Slab):
  def __init__(self, id, linkers):
    super().__init__(id, linkers)
    self.type = 'NORMAL'

class SilverSlab(Slab):
  def __init__(self, id, linkers):
    super().__init__(id, linkers)
    self.type = 'SILVER'

class GoldSlab(Slab):
  def __init__(self, id, linkers):
    super().__init__(id, linkers)
    self.type = 'GOLD'

class SpecialSlab(Slab):
  def __init__(self, id, title, description, costs):
    super().__init__(id, [1, 1, 1, 1])
    self.description = description
    self.costs = costs
    self.title = title
    self.isRisk = False
    self.isSpecial = True

blueTitle = ['Graphical exploring', 'Numerical Exploring','Data Cleaning']
blueDescription = ['Using graphical tools to view your data', 'Using mathematical tools to view your data', 'Preparing your data for analysis']
blueCosts = [[2, 1, 0], [1, 0, 1], [2, 0, 2]]

class SpecialBlue(SpecialSlab):
  def __init__(self, id, type):
    super().__init__(id, blueTitle[type], blueDescription[type], blueCosts[type])
    self.type = 'BLUE'

redTitle = ['Pattern Recognition', 'Outlier Detection', 'Model Evaluation']
redDescription = ['Looking for patterns in your data', 'Looking for strange data in your data', 'How good is the model?']
redCosts = [[0, 1, 2], [1, 0, 1], [2, 1, 1]]

class SpecialRed(SpecialSlab):
  def __init__(self, id, type):
    super().__init__(id, redTitle[type], redDescription[type], redCosts[type])
    self.type = 'RED'

yellowTitle = ['Graphical exploring', 'Numerical Exploring', 'Data Cleaning']
yellowDescription = ['Using graphical tools to view your data', 'Using mathematical tools to view your data', 'Preparing your data for analysis']
yellowCosts = [[0, 1, 1], [0, 1, 2], [1, 2, 1]]

class SpecialYellow(SpecialSlab):
  def __init__(self, id, type):
    super().__init__(id, yellowTitle[type], yellowDescription[type], yellowCosts[type])
    self.type = 'YELLOW'

greenTitle = ['Mobile Application', 'Storytelling', 'Deployment']
greenDescription = ['An app for your mobile phone', 'To present the results to the users', 'To develop the final product']
greenCosts = [[1, 2, 0], [2, 1, 1], [0, 1, 1]]

class SpecialGreen(SpecialSlab):
  def __init__(self, id, type):
    super().__init__(id, greenTitle[type], greenDescription[type], greenCosts[type])
    self.type = 'GREEN'