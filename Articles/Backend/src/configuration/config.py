from pydantic_settings import BaseSettings
from pydantic import Field
from dotenv import load_dotenv


load_dotenv()


class Settings(BaseSettings):
    database_url: str = Field(env="DATABASE_URL", default="mongodb://localhost:27017/mydb")
    open_ai_api_key: str = Field(env="OPEN_AI_API_KEY", default='')
    pinecone_api_key: str = Field(env="PINECONE_API_KEY", default='')
    pinecone_index_name: str = Field(env="PINECONE_INDEX_NAME", default='')


settings = Settings()
