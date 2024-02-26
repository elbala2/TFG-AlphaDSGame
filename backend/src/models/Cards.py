import uuid

class Card(object):
  def __init__(self,
    cardType,
    cardSubtype,
    cardId = None,
  ):
    if cardId == None:
      self.id = uuid.uuid4().__str__()
    else:
      self.id = cardId
    self.type = cardType
    self.subType = cardSubtype


def dictToCard(dict):
  if dict == None:
    return None

  return Card(
    cardId=dict['id'],
    cardType=dict['type'],
    cardSubtype=dict['subType'],
  )
