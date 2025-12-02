import { tasksApi } from "../api/tasks";
import { handleApiError } from "../utils/handleApiError";

export const tasksService = {
  getAll: async () => {
    try {
      const res = await tasksApi.getAllTodos();
      return res.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw handleApiError(error);
    }
  },
};
