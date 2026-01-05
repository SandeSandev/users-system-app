import { useCallback, useEffect, useMemo, useState } from "react";
import { Table, type ColumnDef } from "../../components/Table";
import type { Task } from "../../models/task";
import { tasksService } from "../../services/tasks";
import { notifyApiError } from "../../utils/notifyApiErro";
import { Spinner } from "../../components/Spinner/Spinner";
import styles from "./Tasks.module.css";
import { filterTasks } from "./utils/filterTasks";
import { TaskStatusToggle } from "./TasksStatusToggle/TaskStatusToggle";
import { handleApiError } from "../../utils/handleApiError";
import { Filter } from "./Filter/Filter";
import { NoData } from "../../components/NoData/NoData";

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoadingTasks, setIsLoadingTasks] = useState(true);

  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await tasksService.getAll();
        setTasks(data);
      } catch (error: unknown) {
        const apiError = handleApiError(error);
        notifyApiError(apiError);
      } finally {
        setIsLoadingTasks(false);
      }
    };
    loadPosts();
  }, []);

  const handleStatusChange = useCallback(
    (taskId: number, newStatus: boolean) => {
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, completed: newStatus } : t))
      );
    },
    []
  );

  const columns: ColumnDef<Task>[] = useMemo(
    () => [
      { id: "id", header: "ID" },
      { id: "title", header: "Title" },
      {
        id: "completed",
        header: "Status",
        cell: (row) => (
          <TaskStatusToggle
            completed={row.completed}
            onToggle={(newStatus) => handleStatusChange(row.id, newStatus)}
          />
        ),
      },
    ],
    [handleStatusChange]
  );

  const filtered = useMemo(() => {
    return filterTasks(tasks, debouncedQuery);
  }, [tasks, debouncedQuery]);

  return (
    <div className={styles["tasks-container"]}>
      {isLoadingTasks ? (
        <div className={styles["loading-wrapper"]}>
          <Spinner size="lg" />
        </div>
      ) : (
        <>
          <Filter
            label="Search tasks"
            placeholder="Search by title, owner or status"
            onChange={(value) => setDebouncedQuery(value)}
          />

          {filtered.length === 0 ? (
            <NoData title="No tasks found" />
          ) : (
            <div className={styles["table"]}>
              <Table columns={columns} data={filtered} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Tasks;
