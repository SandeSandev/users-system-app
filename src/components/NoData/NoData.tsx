import type { ReactNode } from "react";
import styles from "./NoData.module.css";
import cn from "classnames";

interface NoDataProps {
  title?: string;
  message?: string;
  icon?: ReactNode;
  className?: string;
  children?: ReactNode;
}

export const NoData: React.FC<NoDataProps> = ({
  title = "No data available",
  message,
  icon,
  className,
  children,
}) => {
  return (
    <div className={cn(styles['container'], className)}>
      {icon && <div className={styles['icon']}>{icon}</div>}

      <h3 className={styles['title']}>{title}</h3>

      {message && <p className={styles['message']}>{message}</p>}

      {children && <div className={styles['extra']}>{children}</div>}
    </div>
  );
};
