# FastAPI with MongoDB, Pinecone, and React

## Project Overview
This project is a **FastAPI-based backend** that integrates with **MongoDB** for data storage, **Pinecone** for vector search. The application also has a simple frontend in React

## Features
- FastAPI backend with multiple services
- MongoDB integration for data persistence
- Pinecone for vector storage and similarity search
- Docker support for containerized deployment

## Prerequisites
Before running the project, ensure you have the following installed:
- Python (3.10 or higher)
- MongoDB (Local or Atlas)
- Docker (Optional, for containerized setup)

## Installation & Setup

### 1. Clone the Repository
```sh
git clone https://github.com/adamk-1886/Assessment.git
cd Assessment
```

### 2. Create and Activate Virtual Environment
```sh
python -m venv venv  # Create virtual environment
source venv/bin/activate  # MacOS/Linux
venv\Scripts\activate  # Windows
```

### 3. Install Dependencies
```sh
pip install -r requirements.txt
```

### 4. Set Up Environment Variables
Create a `.env` file in the root directory and add the following:
```ini
MONGODB_URI=your mogodb url
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_API_KEY=your pinecone api key
PINECONE_INDEX_NAME=your pinecone index name

```

### 5. Run the Application
Start the FastAPI server:
```sh
uvicorn main:app --reload --port 8081
```

If running inside Docker:
```sh
docker-compose up --build
```

### 6. Test the API
Once the server is running, visit:
- **API Documentation (Swagger UI):** `http://127.0.0.1:8087/docs`
- **Redoc Documentation:** `http://127.0.0.1:8087/redoc`


## Docker Deployment
To deploy the entire project with Docker:
```sh
docker-compose up --build
```

## Troubleshooting
If you encounter MongoDB connection issues, ensure:
- Your **MongoDB URI** is correct.
- Your **IP is whitelisted** in MongoDB Atlas.
- DNS resolution issues are fixed by using Google DNS (`8.8.8.8`).

If `uvicorn` fails to start, ensure:
- The correct **port** is being used (`--port 8081`).
- Required **dependencies** are installed.

For any other issues, check logs:
```sh
uvicorn main:app --reload --log-level debug
```

## License
This project is licensed under the MIT License.

