from pinecone import Pinecone, ServerlessSpec
from configuration.config import settings


def init_pinecone():
    pc = Pinecone(api_key=settings.pinecone_api_key)

    if settings.pinecone_index_name not in pc.list_indexes().names():
        pc.create_index(
            name=settings.pinecone_index_name,
            dimension=1536,
            metric='euclidean',
            spec=ServerlessSpec(
                cloud='aws',
                region='us-west-2'
            )
        )

    return pc.Index(settings.pinecone_index_name)


pinecone_index = init_pinecone()
