import styles from "./TaskStatusToggle.module.css";

interface TaskStatusToggleProps {
  completed: boolean;
  onToggle: (newValue: boolean) => void;
}

export const TaskStatusToggle = ({
  completed,
  onToggle,
}: TaskStatusToggleProps) => {
  return (
    <button
      className={`${styles["toggle"]} ${
        completed ? styles["completed"] : styles["not-completed"]
      }`}
      onClick={() => onToggle(!completed)}
    >
      {completed ? "Completed" : "Not Completed"}
    </button>
  );
};
