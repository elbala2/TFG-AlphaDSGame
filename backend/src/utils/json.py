import json

def toJSON(obj):
  return str(json.loads(json.dumps(obj, default=lambda o: getattr(o, '__dict__', str(o)))))