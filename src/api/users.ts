import type { User } from "../models/user";
import { api } from "./axios";

export const usersApi = {
  getAllUsers: () => api.get<User[]>("/users"),
  updateUserById: (userId: string | number, data: User) => api.patch<User>(`users/${userId}`, data),
};
