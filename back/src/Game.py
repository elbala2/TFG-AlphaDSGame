import json
import random

from Cards import *
from slabs import *
from Player import *

def genCards():
  res = []
  for i in range(4):
    res += [Card(['Mathematics', 'Fast Model']),
            Card(['Mathematics', 'Simple Model']),
            Card(['Mathematics', 'Right Model']),
            Card(['Computer Science', 'New Technology']),
            Card(['Computer Science', 'Antivirus']),
            Card(['Computer Science', 'Open Source']),
            Card(['Domain', 'Data Base']),
            Card(['Domain', 'Protected Data']),
            Card(['Domain', 'Team Spirit'])]
  random.shuffle(res);
  return res

def genSlabs():
  res = [] \
  + [NormalSlab([0, 1, 0, 1]) for i in range(6)] \
  + [NormalSlab([1, 1, 1, 1]) for i in range(6)] \
  + [NormalSlab([0, 1, 1, 0]) for i in range(12)] \
  + [NormalSlab([1, 0, 1, 1]) for i in range(14)] \
    \
  + [GoldSlab([0, 1, 0, 1]),
  GoldSlab([1, 1, 1, 1]),
  GoldSlab([0, 1, 1, 0]),
  GoldSlab([1, 0, 1, 1])] \
    \
  + [SilverSlab([0, 1, 0, 1]),
  SilverSlab([1, 1, 1, 1]),
  SilverSlab([0, 1, 1, 0]),
  SilverSlab([1, 0, 1, 1])] \
    \
  + [SpecialRed(i) for i in range(3)] \
  + [SpecialBlue(i) for i in range(3)] \
  + [SpecialGreen(i) for i in range(3)] \
  + [SpecialYellow(i) for i in range(3)] \
    \
  + [Risk('Complex Model', 'Use Simple Model to fix the risk', 2),
    Risk('Danger Data', 'Use Protected Data to fix the risk', 1),
    Risk('No Data', 'Use Data Base to fix the risk', 2),
    Risk('Old Software', 'Use Open Source to fix the risk', 1),
    Risk('Old Technology', 'Use New Technology to fix the risk', 2),
    Risk('Slow Model', 'Use Fast Model to fix the risk', 1),
    Risk('Virus', 'Use Antivirus to fix the risk', 2),
    Risk('Working Alone', 'Use Team Spirit to fix the risk', 1),
    Risk('Wrong Model', 'Use Right Model to fix the risk', 2)]
  
  random.shuffle(res)
  return res

class Game:
  def __init__(self, start = 1):
    self.cards = genCards()
    self.slabs = genSlabs()
    self.players = [Player(i, 'Player '+ str(i), start) for i in range(4)]
    self.start = start
    
  def toJSON(self):
    return json.loads(json.dumps(self, default=lambda o: getattr(o, '__dict__', str(o))))