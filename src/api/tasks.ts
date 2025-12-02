import type { Todo } from "../models/todo";
import { api } from "./axios";

export const tasksApi = {
  getAllTodos: () => api.get<Todo[]>("/todos"),
};