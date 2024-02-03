
def indexOf(array, obj):
  for i in range(len(array)):
    if array[i].id == obj.id:
      return i
  return -1

def findIndex(array, object):
  for i in range(len(array)):
    if (array[i].id == object.id):
      return i
  return -1

def findIndexById(array, id):
  for i in range(len(array)):
    print(array[i].id, id)
    if (array[i].id == id):
      return i
  return -1

def findById(array, id):
  for i in range(len(array)):
    if (array[i].id == id):
      return array[i]
  return None

def apply(listA, function, default):
  defaultAux = default
  for x in listA:
    defaultAux = function(defaultAux, x)
  return defaultAux
