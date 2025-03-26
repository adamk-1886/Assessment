import { useState } from 'react'
import { useCreateArticle } from '../hooks/useArticle'

const ArticleForm = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [description, setDescription] = useState('')
  const [summary, setSummary] = useState('')
  const [titleError, setTitleError] = useState(false)

  const createArticle = useCreateArticle()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!title.trim()) {
      setTitleError(true)
      return
    }

    createArticle.mutate({ title, content, description, summary })

    // Reset form fields
    setTitle('')
    setContent('')
    setDescription('')
    setSummary('')
    setTitleError(false)
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded-md">
      <div className="mb-2">
        <input
          type="text"
          className={`w-full p-2 border ${
            titleError ? 'border-red-500' : 'border-gray-300'
          } rounded`}
          placeholder="Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
            if (titleError) setTitleError(false)
          }}
        />
        {titleError && (
          <p className="text-red-500 text-sm mt-1">Title is required</p>
        )}
      </div>

      <textarea
        className="w-full p-2 border border-gray-300 rounded mb-2"
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <textarea
        className="w-full p-2 border border-gray-300 rounded mb-2"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <textarea
        className="w-full p-2 border border-gray-300 rounded mb-2"
        placeholder="Summary"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </form>
  )
}

export default ArticleForm
