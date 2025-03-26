import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  fetchArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} from '../api/articles'

export function useArticles() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['articles'],
    queryFn: fetchArticles,
  })
  return {
    articles: data || [],
    isLoading,
    error: isError,
  }
}

export function useCreateArticle() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createArticle,
    onSuccess: () => {
      queryClient.invalidateQueries(['articles'])
    },
  })
}

export function useUpdateArticle() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, article }) => {
      if (!id || typeof id !== 'string') {
        console.error('Invalid article ID:', id)
        return
      }
      return updateArticle(id, article)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['articles'])
    },
    onError: (error) => {
      console.error('Update failed:', error)
    },
  })
}

export function useDeleteArticle() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteArticle,
    onSuccess: () => {
      queryClient.invalidateQueries(['articles'])
    },
  })
}
