from decouple import config

import mysql.connector


def connectMySQL():
  try:
    return mysql.connector.connect(
      host=config('DB_HOST'),
      user=config('DB_USER'),
      passwd=config('DB_PASSWORD'),
      database=config('DB_NAME'),
    );
  except Exception as error:
    print(error)
