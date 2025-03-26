import React, { useState } from 'react'
import { useArticles } from '../hooks/useArticle'
import { useEmbedArticle, useSearchArticles } from '../hooks/usePineCone'

const PineconeQuery = () => {
  const { articles, isLoading } = useArticles()
  const embedArticle = useEmbedArticle()
  const searchArticles = useSearchArticles()

  const [selectedArticle, setSelectedArticle] = useState('')
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

  // Embed Selected Article
  const handleEmbed = async () => {
    if (!selectedArticle) {
      alert('Please select an article first.')
      return
    }
    try {
      await embedArticle.mutateAsync(selectedArticle)
      alert('Embedding successful!')
    } catch (error) {
      alert('Error embedding article.')
      console.error(error)
    }
  }

  const handleSearch = async () => {
    if (!query) {
      alert('Please enter a search query.')
      return
    }
    try {
      const response = await searchArticles.mutateAsync(query)
      setResults(response.results)
    } catch (error) {
      alert('Error searching articles.')
      console.error(error)
    }
  }

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Pinecone Query</h2>

      {/* Select Article for Embedding */}
      <div className="mb-4">
        <label className="block font-medium">Select Article to Embed:</label>
        <select
          value={selectedArticle}
          onChange={(e) => setSelectedArticle(e.target.value)}
          className="p-2 border rounded w-full"
        >
          <option value="">-- Select an Article --</option>
          {articles.map((article) => (
            <option key={article.id} value={article.id}>
              {article.title}
            </option>
          ))}
        </select>
        <button
          onClick={handleEmbed}
          className="mt-2 bg-blue-600 text-white p-2 rounded w-full"
          disabled={embedArticle.isLoading}
        >
          {embedArticle.isLoading ? 'Embedding...' : 'Embed Article'}
        </button>
      </div>

      {/* Search Input for Finding Similar Articles */}
      <div className="mb-4">
        <label className="block font-medium">
          Search for Similar Articles:
        </label>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2 border rounded w-full"
          placeholder="Enter search query"
        />
        <button
          onClick={handleSearch}
          className="mt-2 bg-green-600 text-white p-2 rounded w-full"
          disabled={searchArticles.isLoading}
        >
          {searchArticles.isLoading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {/* Display Search Results */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Search Results:</h3>
        {results.length === 0 ? (
          <p>No results found.</p>
        ) : (
          <ul className="mt-2 border rounded p-2">
            {results.map((result, index) => (
              <li key={index} className="p-2 border-b">
                Article ID: {result.id} (Score: {result.score.toFixed(2)})
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default PineconeQuery
