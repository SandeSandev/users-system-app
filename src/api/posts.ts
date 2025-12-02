import type { Post } from "../models/post";
import { api } from "./axios";

export const postsApi = {
  getPostByUser: async (userId: string | number) =>
    api.get<Post[]>("/posts", { params: { userId } }),

  updatePost: (postId: number | string, data: Partial<Post>) =>
    api.patch<Post>(`/posts/${postId}`, data),

  deletePost: (id: number) => api.delete<void>(`/posts/${id}`),
};
