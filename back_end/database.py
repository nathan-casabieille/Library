import os
import logging
import pymongo
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

logging.basicConfig(format='%(asctime)s - %(message)s', level=logging.INFO)

def init_db():
    if os.getenv("IS_UNIT_TESTING") == "True":
        logging.info("Unit testing, not initializing database")
        return
    logging.info("Initializing database")
    try:
        client = MongoClient(
            host=os.getenv("MONGODB_HOST"),
            port=int(os.getenv("MONGODB_PORT")),
            username=os.getenv("MONGODB_USERNAME"),
            password=os.getenv("MONGODB_PASSWORD"),
            authSource=os.getenv("MONGODB_AUTH_SOURCE")
        )
        db = client[os.getenv("MONGODB_DATABASE")]
        logging.info('Connected to MongoDB')
    except pymongo.errors.ConnectionFailure as e:
        logging.error('Could not connect to MongoDB: %s', e)
        exit(1)
    logging.info("Database initialized")
    return db

db = init_db()
