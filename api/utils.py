
def indexOf(array, obj):
  for i in range(len(array)):
    if array[i].id == obj.id:
      return i
  return -1

def find(array, object):
  for i in range(len(array)):
    if (array[i].id == object.id):
      return i
  return -1

def findById(array, id):
  for i in range(len(array)):
    if (array[i].id == int(id)):
      return i
  return -1