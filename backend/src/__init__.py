from flask import Flask
from flask_cors import CORS

from .routes import GameRoutes

app = Flask(__name__)
app.debug = True
CORS(app)

def startServer():
  app.register_blueprint(GameRoutes.base, url_prefix='/game')

  return app