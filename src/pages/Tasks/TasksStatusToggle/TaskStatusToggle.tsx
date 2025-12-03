import React from "react";
import styles from "./TaskStatusToggle.module.css";

interface Props {
  completed: boolean;
  onToggle: (newValue: boolean) => void;
}

export const TaskStatusToggle: React.FC<Props> = ({ completed, onToggle }) => {
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
