import { useMutation } from "@tanstack/react-query";
import { embedArticle, searchArticles } from "../api/pinecone";

export function useEmbedArticle() {
  return useMutation({
    mutationFn: embedArticle,
  });
}

export function useSearchArticles() {
  return useMutation({
    mutationFn: searchArticles,
  });
}
