import { Table, type ColumnDef } from "../components/Table";
import type { Task } from "../models/task";
const mockData: Task[] = [
  {
    userId: 1,
    id: 1,
    title: "delectus aut autem",
    completed: false,
  },
  {
    userId: 1,
    id: 2,
    title: "quis ut nam facilis et officia qui",
    completed: false,
  },
  {
    userId: 1,
    id: 3,
    title: "fugiat veniam minus",
    completed: false,
  },
  {
    userId: 1,
    id: 4,
    title: "et porro tempora",
    completed: true,
  },
  {
    userId: 1,
    id: 5,
    title: "laboriosam mollitia et enim quasi adipisci quia provident illum",
    completed: false,
  },
  {
    userId: 1,
    id: 6,
    title: "qui ullam ratione quibusdam voluptatem quia omnis",
    completed: false,
  },
  {
    userId: 1,
    id: 7,
    title: "illo expedita consequatur quia in",
    completed: false,
  },
];

const Tasks: React.FC = () => {
  const columns: ColumnDef<Task>[] = [
    { id: "id", header: "ID" },
    { id: "title", header: "Title" },
    { id: "completed", header: "Completed" },
  ];

  return <Table columns={columns} data={mockData}></Table>;
};

export default Tasks;
