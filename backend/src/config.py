MISSION_TYPE_WOLFS = 'MISSION_TYPE_WOLFS'
MISSION_TYPE_DNA_SHERIFF = 'MISSION_TYPE_DNA_SHERIFF'
MISSION_TYPE_TO_SAFETY = 'MISSION_TYPE_TO_SAFETY'

MISSION_TYPES = [
  MISSION_TYPE_WOLFS,
  MISSION_TYPE_DNA_SHERIFF,
  MISSION_TYPE_TO_SAFETY,
]


BLUE = 'BLUE'
YELLOW = 'YELLOW'
RED = 'RED'
GREEN = 'GREEN'

playerColors = [BLUE, YELLOW, RED, GREEN]

NORMAL = 'NORMAL'
SILVER = 'SILVER'
GOLD = 'GOLD'

TITLE_KEYS = 'titleKeys'
DESCRIPTION_KEYS = 'descriptionKeys'

specialSlabs = {
  BLUE: {
    TITLE_KEYS: ['bigData', 'goalsDef','dataUnderstanding'],
    DESCRIPTION_KEYS: ['lotOfData', 'questionAnswer', 'dataOkey'],
    'costs': [[2, 1, 0], [1, 0, 1], [2, 0, 2]],
  },
  YELLOW: {
    TITLE_KEYS: ['graficalExploring', 'numericalExploring','dataCleaning'],
    DESCRIPTION_KEYS: ['graphicalTools', 'mathematicalTools', 'dataAnalysis'],
    'costs': [[0, 1, 1], [0, 1, 2], [1, 2, 1]],
  },
  RED: {
    TITLE_KEYS: ['patternRecognition', 'outlierDetection', 'modelEvaluation'],
    DESCRIPTION_KEYS: ['patternsInData', 'strangeData', 'modelGood'],
    'costs': [[0, 1, 2], [1, 0, 1], [2, 1, 1]],
  },
  GREEN: {
    TITLE_KEYS: ['mobileApplication', 'storytelling', 'deployment'],
    DESCRIPTION_KEYS: ['phoneApp', 'userResults', 'finalProduct'],
    'costs': [[1, 2, 0], [2, 1, 1], [0, 1, 1]],
  },
}

DOMAIN = 'domain'
COMP_SCI = 'compSci'
MATH = 'math'

cardTypes = {
  DOMAIN: [
    'protData',
    'dataBase',
    'teamSpirit',
  ],
  COMP_SCI: [
    'openSource',
    'antivirus',
    'newTech',
  ],
  MATH : [
    'simpModel',
    'fastModel',
    'rightModel',
  ],
}

risksKeys = {
  'dngData': cardTypes[DOMAIN][0],
  'noData': cardTypes[DOMAIN][1],
  'workingAlone': cardTypes[DOMAIN][2],

  'oldSW': cardTypes[COMP_SCI][0],
  'virus': cardTypes[COMP_SCI][1],
  'oldTech': cardTypes[COMP_SCI][2],

  'cmplxModel': cardTypes[MATH][0],
  'slowModel': cardTypes[MATH][1],
  'wrongModel': cardTypes[MATH][2],
}

up = 0
right = 1
down = 2
left = 3

rotationOrder = [
  up,
  right,
  down,
  left,
]

vUp = [0, -1]
vRight = [1, 0]
vDown = [0, 1]
vLeft = [-1, 0]

positionVectors = [
  vUp,
  vRight,
  vDown,
  vLeft,
]

x = 0
y = 1