import { useState } from 'react'
import {
  useArticles,
  useUpdateArticle,
  useDeleteArticle,
} from '../hooks/useArticle'

const ArticleList = () => {
  const { articles, isLoading, error } = useArticles()
  const updateArticle = useUpdateArticle()
  const deleteArticle = useDeleteArticle()

  const [expandedArticle, setExpandedArticle] = useState(null)
  const [editingArticle, setEditingArticle] = useState(null)
  const [editForm, setEditForm] = useState({
    title: '',
    content: '',
    description: '',
    summary: '',
  })

  const handleEdit = (article) => {
    setEditingArticle(article.id)
    setEditForm({
      title: article.title,
      content: article.content,
      description: article.description,
      summary: article.summary,
    })
  }

  const handleUpdate = (id) => {
    updateArticle.mutate({ id, article: editForm })
    setEditingArticle(null)
  }

  const toggleExpand = (id) => {
    setExpandedArticle(expandedArticle === id ? null : id)
  }

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error fetching articles</p>

  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold">Articles</h2>
      <ul>
        {articles?.map((article) => (
          <li key={article.id} className="border p-2 mt-2 rounded shadow">
            {editingArticle === article.id ? (
              <div className="space-y-2">
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Title"
                  value={editForm.title}
                  onChange={(e) =>
                    setEditForm({ ...editForm, title: e.target.value })
                  }
                />
                <textarea
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Content"
                  value={editForm.content}
                  onChange={(e) =>
                    setEditForm({ ...editForm, content: e.target.value })
                  }
                />
                <textarea
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Description"
                  value={editForm.description}
                  onChange={(e) =>
                    setEditForm({ ...editForm, description: e.target.value })
                  }
                />
                <textarea
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Summary"
                  value={editForm.summary}
                  onChange={(e) =>
                    setEditForm({ ...editForm, summary: e.target.value })
                  }
                />
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded"
                  onClick={() => handleUpdate(article.id)}
                >
                  Save
                </button>
                <button
                  className="bg-gray-500 text-white px-2 py-1 rounded ml-2"
                  onClick={() => setEditingArticle(null)}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-semibold">{article.title}</h3>
                <p className="text-sm">{article.description}</p>
                {expandedArticle === article.id ? (
                  <p>{article.content}</p>
                ) : (
                  <p>
                    {article.content.slice(0, 100)}...
                    <button
                      className="text-blue-500"
                      onClick={() => toggleExpand(article.id)}
                    >
                      Read More
                    </button>
                  </p>
                )}
                <p className="text-gray-500 text-xs">{article.summary}</p>
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded mt-2"
                  onClick={() => handleEdit(article)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded mt-2 ml-2"
                  onClick={() => deleteArticle.mutate(article.id)}
                >
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ArticleList
