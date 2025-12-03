import { tasksApi } from "../api/tasks";
import { handleApiError } from "../utils/handleApiError";

export const tasksService = {
  getAll: async () => {
    try {
      const res = await tasksApi.getAllTodos();
      return res.data;
    } catch (error: unknown) {
      throw handleApiError(error);
    }
  },
};
