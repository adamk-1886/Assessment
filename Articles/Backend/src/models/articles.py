import openai
from openai import OpenAI
from pydantic import BaseModel
from configuration.database import get_collection
from configuration.config import settings
from configuration.pinecone_setup import pinecone_index
from typing import Optional
from bson import ObjectId
from fastapi import HTTPException


class ArticleCreateModel(BaseModel):
    title: str
    content: Optional[str] = None
    summary: Optional[str] = None
    description: Optional[str] = None


class Articles(ArticleCreateModel):
    id: str

    @staticmethod
    def get_all_articles():
        articles_collection = get_collection('articles')
        articles = list(articles_collection.find({}))

        return [
            {
                "id": str(article["_id"]),
                "title": str(article["title"]),
                "content": article.get("content", "No content available"),
                "summary": article.get("summary", "No summary available"),
                "description": article.get("description", "No description available")
            }
            for article in articles
        ]

    @staticmethod
    def create_article(article_data: ArticleCreateModel):
        article_collection = get_collection('articles')
        article_dict = article_data.model_dump()
        result = article_collection.insert_one(article_dict)

        return {
            "id": str(result.inserted_id),
            "message": "Article Inserted Successfully"
        }

    @staticmethod
    def get_article_by_id(article_id: str):
        article_collection = get_collection('articles')
        obj_id = ObjectId(article_id)

        if not obj_id:
            raise HTTPException(status_code=400, detail='Invalid Format')

        article = article_collection.find_one({"_id": obj_id})
        if not article:
            raise HTTPException(status_code=404, detail="Article Not Found")

        return {
            "id": str(article["_id"]),
            "title": str(article["title"]),
            "content": article.get("content", "No content available"),
            "summary": article.get("summary", "No summary available"),
            "description": article.get("description", "No description available")
        }

    @staticmethod
    def update_article(article_id, updated_article_data: ArticleCreateModel):
        article_collection = get_collection('articles')
        obj_id = ObjectId(article_id)

        if not obj_id:
            raise HTTPException(status_code=400, detail='Invalid Format')

        existing_article = article_collection.find_one({"_id": obj_id})
        if not existing_article:
            raise HTTPException(status_code=404, detail='Article not found')

        updated_data_dict = updated_article_data.model_dump(exclude_unset=True)
        article_collection.update_one(
            {"_id": obj_id}, {"$set": updated_data_dict}
        )

        return {"id": article_id, "message": "Article updated successfully"}

    @staticmethod
    def delete_article(article_id):
        article_collection = get_collection('articles')
        obj_id = ObjectId(article_id)

        if not obj_id:
            raise HTTPException(status_code=400, detail='Invalid Format')

        existing_article = article_collection.find_one({"_id": obj_id})
        if not existing_article:
            raise HTTPException(status_code=404, detail='Article not found')

        article_collection.delete_one({"_id": obj_id})

        return {"id": article_id, "message": "Article deleted successfully"}

    @staticmethod
    def summarize_article(article_id: str):
        article = Articles.get_article_by_id(article_id)
        if not article:
            raise HTTPException(status_code=404, detail="Article not found!")

        client = OpenAI(api_key=settings.open_ai_api_key)

        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "user", "content": f"Summarize this article: {article.get('content', '')}"}],
            max_tokens=100
        )

        summary = response.choices[0].message.content

        updated_article_data_with_summary = ArticleCreateModel(
            title=article.get("title", "Untitled"),
            content=article.get("content", ""),
            summary=summary,
            description=article.get("description", "")
        )

        Articles.update_article(article_id, updated_article_data_with_summary)

        return {"article_id": article_id, "summary": summary}

    @staticmethod
    def embed_article(article_id: str):
        article = Articles.get_article_by_id(article_id)
        if not article:
            raise HTTPException(status_code=404, detail="Article not found!")

        response = openai.Embedding.create(
            model="text-embedding-ada-002",
            input=article["content"]
        )
        embedding = response["data"][0]["embedding"]

        pinecone_index.upsert([(article_id, embedding)])

        return {"article_id": article_id, "message": "Embedding stored successfully"}

    @staticmethod
    def search_similar_articles(query: str, top_k: int = 5):
        response = openai.Embedding.create(
            model="text-embedding-ada-002",
            input=query
        )
        query_embedding = response["data"][0]["embedding"]

        results = pinecone_index.query(query_embedding, top_k=5, include_metadata=True)

        return {"results": results}
