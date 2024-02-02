import json

def toJSON(obj):
  res = json.dumps(obj, default=lambda o: getattr(o, '__dict__', str(o)))
  return  res

def fromJSON(js):
  return json.loads(js)