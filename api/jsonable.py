import json

class JSONObj:
  def toJSON(self):
    return json.dumps(self, default=lambda o: getattr(o, '__dict__', str(o)))