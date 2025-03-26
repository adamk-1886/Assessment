from pymongo import MongoClient
from configuration.config import settings

client = MongoClient(settings.database_url)

db = client['article-management-system']


def get_collection(collection_name: str):
    return db[collection_name]
