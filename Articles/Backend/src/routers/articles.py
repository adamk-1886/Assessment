from fastapi import APIRouter, HTTPException
from models.articles import Articles, ArticleCreateModel


article = APIRouter()


@article.get("/")
async def main():
    return {
        "Hello": "Connected to Agile Force DB"
    }


@article.get('/articles/')
async def get_all_articles():
    try:
        return Articles.get_all_articles()
    except Exception as e:
        print(f"Error retrieving articles: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")


@article.get('/articles/{article_id}')
async def get_article_by_id(article_id: str):
    try:
        return Articles.get_article_by_id(article_id)
    except Exception as e:
        print(f"Error retrieving article: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")


@article.post("/articles/")
async def create_article(new_article: ArticleCreateModel):
    try:
        return Articles.create_article(new_article)
    except Exception as e:
        print(f"Error creating articles: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")


@article.put("/articles/{article_id}")
async def update_article(article_id: str, update_article_data: ArticleCreateModel):
    try:
        return Articles.update_article(article_id, update_article_data)
    except Exception as e:
        print(f"Error updating articles: {e}")
        raise HTTPException(status_code=500, detail='Internal Server Error')


@article.delete("/articles/{article_id}")
async def delete_article(article_id: str):
    try:
        return Articles.delete_article(article_id)
    except Exception as e:
        print(f"Error updating articles: {e}")
        raise HTTPException(status_code=500, detail='Internal Server Error')


@article.post("/articles/{article_id}/summarize")
async def summarize_article_by_id(article_id: str):
    try:
        Articles.summarize_article(article_id)
    except Exception as e:
        print(f"Error summarizing articles: {e}")
        raise HTTPException(status_code=500, detail='Internal Server Error')


@article.post("/articles/{article_id}/embed")
async def embed_article(article_id: str):
    try:
        Articles.embed_article(article_id)
    except Exception as e:
        print(f"Error embedding articles: {e}")
        raise HTTPException(status_code=500, detail='Internal Server Error')


@article.get("/articles/search")
async def embed_article(query: str):
    try:
        Articles.search_similar_articles(query)
    except Exception as e:
        print(f"Error searching articles: {e}")
        raise HTTPException(status_code=500, detail='Internal Server Error')

