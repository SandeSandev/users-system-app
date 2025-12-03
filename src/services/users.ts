import { usersApi } from "../api/users";
import type { User } from "../models/user";
import { handleApiError } from "../utils/handleApiError";

export const userService = {
  getAll: async () => {
    try {
      const res = await usersApi.getAllUsers();
      return res.data;
    } catch (error: unknown) {
      throw handleApiError(error);
    }
  },

  updateById: async (id: number, data: User) => {
    try {
      const res = await usersApi.updateUserById(id, data);
      return res.data;
    } catch (error: unknown) {
      throw handleApiError(error);
    }
  },
};
