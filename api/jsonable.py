import json

class JSONObj:
  def toJSON(self):
    return json.dumps(self, default=lambda o: o.__dict__)

class ComplexEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Abc) or isinstance(obj, Doc):
            return obj.toJSON()
        else:
            return json.JSONEncoder.default(self, obj)