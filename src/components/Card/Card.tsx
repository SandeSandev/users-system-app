import type { ReactNode } from "react";
import styles from "./Card.module.css";

import cn from "classnames";
interface CardProps {
  children: ReactNode;
  classes?: string;
}

export const Card: React.FC<CardProps> = ({ children, classes, ...rest }) => {
  return (
    <div className={cn(styles["card"], classes)} {...rest}>
      {children}
    </div>
  );
};
