import random
import json

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
  blue = random.randint(0, 4)
  red = random.randint(0, 4 - blue)
  green = random.randint(0, 4 - blue - red)
  if (blue + red + green == 0):
    return [1, 0, 1]
  else:
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
  def __init__(self, type, description, costs):
    self.puntos = getPointsValue(self)
    self.costs = costs
    self.type = type
    self.description = description
    self.needed = getRiskFixCardType(type)
    self.isRisk = True
    self.isSpecial = True

class Slab:
  def __init__(self, linkers, type = ''):
    self.puntos = getPointsValue(self)
    self.costs = getCosts()
    self.rotacion = 0
    self.isHere = False
    self.linkers = linkers
    self.type = type
    self.isRisk = False
    self.isSpecial = False

  def ApplyRotation(self):
    #arriba,derecha,abajo,izquierda
    result = self.linkers.copy()
    for i in range(self.rotation):
      result = result[1:] + result[0:]
    return result
  
  def toJSON(self):
    return json.loads(json.dumps(self, default=lambda o: getattr(o, '__dict__', str(o))))


class NormalSlab(Slab):
  def __init__(self, linkers):
    super().__init__(linkers)
    self.type = 'Normal'

class SilverSlab(Slab):
  def __init__(self, linkers):
    super().__init__(linkers)
    self.type = 'Silver'

class GoldSlab(Slab):
  def __init__(self, linkers):
    super().__init__(linkers)
    self.type = 'Gold'

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
    self.type = 'blue'

redTitle = ['Pattern Recognition', 'Outlier Detection', 'Model Evaluation']
redDescription = ['Looking for patterns in your data', 'Looking for strange data in your data', 'How good is the model?']
redCosts = [[0, 1, 2], [1, 0, 1], [2, 1, 1]]

class SpecialRed(SpecialSlab):
  def __init__(self, type):
    super().__init__(redTitle[type], redDescription[type], redCosts[type])
    self.type = 'red'

yellowTitle = ['Graphical exploring', 'Numerical Exploring', 'Data Cleaning']
yellowDescription = ['Using graphical tools to view your data', 'Using mathematical tools to view your data', 'Preparing your data for analysis']
yellowCosts = [[0, 1, 1], [0, 1, 2], [1, 2, 1]]

class SpecialYellow(SpecialSlab):
  def __init__(self, type):
    super().__init__(yellowTitle[type], yellowDescription[type], yellowCosts[type])
    self.type = 'yellow'

greenTitle = ['Mobile Application', 'Storytelling', 'Deployment']
greenDescription = ['An app for your mobile phone', 'To present the results to the users', 'To develop the final product']
greenCosts = [[1, 2, 0], [2, 1, 1], [0, 1, 1]]

class SpecialGreen(SpecialSlab):
  def __init__(self, type):
    super().__init__(greenTitle[type], greenDescription[type], greenCosts[type])
    self.type = 'green'