import { useEffect, useRef, useState } from "react";
import { Table, type ColumnDef } from "../../components/Table";
import type { Task } from "../../models/task";
import { tasksService } from "../../services/tasks";
import { notifyApiError } from "../../utils/notifyApiErro";
import { Spinner } from "../../components/Spinner/Spinner";
import styles from "./Tasks.module.css";
import { Button } from "../../components/Button";
import { filterTasks } from "./utils/filterTasks";
import { TaskStatusToggle } from "./TasksStatusToggle/TaskStatusToggle";

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoadingTasks, setIsLoadingTasks] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState("");

  const handleStatusChange = async (taskId: number, newStatus: boolean) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: newStatus } : t))
    );
  };

  const columns: ColumnDef<Task>[] = [
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
  ];

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await tasksService.getAll();
        setTasks(data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        notifyApiError(error);
      } finally {
        setIsLoadingTasks(false);
      }
    };
    loadPosts();
  }, []);

  const handleOnClickFilter = () => {
    const query = inputRef.current?.value.trim() || "";

    console.log(query);
    setQuery(query);
  };

  const filtered = filterTasks(tasks, query);

  if (isLoadingTasks) {
    return <Spinner size="md" />;
  }

  return (
    <div className={styles["tasks-container"]}>
      <div className={styles["filter-input-container"]}>
        <input
          type="text"
          className={styles["filter-input"]}
          placeholder="Search by title, owner or status true/false"
          ref={inputRef}
        />
        <Button
          variant="normal"
          color="primary"
          onClick={() => handleOnClickFilter()}
        >
          Filter
        </Button>
      </div>
      <Table columns={columns} data={filtered}></Table>
    </div>
  );
};

export default Tasks;
