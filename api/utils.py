
def indexOf(array, obj):
  for i in range(len(array)):
    if array[i] == obj.id:
      return i
  return -1