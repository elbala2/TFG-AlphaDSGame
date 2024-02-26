from flask import Flask
from flask_cors import CORS
from decouple import config

from .routes import GameRoutes

def startServer():
  app = Flask(__name__)
  app.debug = True
  CORS(app, origins=config('FRONT_URLS'))
  app.register_blueprint(GameRoutes.base, url_prefix='/game')

  return app