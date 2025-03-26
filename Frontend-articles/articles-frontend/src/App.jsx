import React from 'react'
import ArticleList from './components/ArticleList'
import ArticleForm from './components/ArticleForm'
import PineconeQuery from './components/PineConeQuery'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="p-8">
        <h1 className="text-2xl font-bold">Article Manager</h1>
        <ArticleForm />
        <ArticleList />
        <PineconeQuery />
      </div>
    </QueryClientProvider>
  )
}

export default App
