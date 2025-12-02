import { postsApi } from "../api/posts";
import type { Post } from "../models/post";
import { handleApiError } from "../utils/handleApiError";

export const postsService = {
  getByUserId: async (userId: number | string | undefined) => {
    if (!userId) {
      throw new Error("userId is required");
    }
    try {
      const res = await postsApi.getPostByUser(userId);
      return res.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw handleApiError(error);
    }
  },
  async updateById(postId: number, data: Partial<Post>) {
    try {
      const res = await postsApi.updatePost(postId, data);
      return res.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  async deleteById(id: number): Promise<void> {
    try {
      await postsApi.deletePost(id);
    } catch (error) {
      throw handleApiError(error);
    }
  },
};
