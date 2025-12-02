import type { Task } from "../../../models/task";

  export const filterTasks = (tasks: Task[], query: string): Task[] => {
    if (!query.trim()) return tasks;

    const newQuery = query.trim().toLowerCase();

    return tasks.filter((task) => {
      const titleMatch = task.title.toLowerCase().includes(newQuery);
      const ownerMatch = task.userId.toString().includes(newQuery);

      const completedMatch =
        (newQuery === "completed" || newQuery === "true") &&
        task.completed === true;

      const notCompletedMatch =
        (newQuery === "not-completed" || newQuery === "false") &&
        task.completed === false;

      return titleMatch || ownerMatch || completedMatch || notCompletedMatch;
    });
  };
