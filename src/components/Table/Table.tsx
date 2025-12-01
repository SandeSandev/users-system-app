import type { ReactNode } from "react";
import styles from "./Table.module.css";
import cn from "classnames";

export interface ColumnDef<T extends object> {
  id: keyof T & string;
  header: ReactNode;
  cell?: (row: T) => ReactNode;
  headerClassName?: string;
  cellClassName?: string;
}

export interface TableProps<T extends object> {
  data: T[];
  columns: ColumnDef<T>[];
  className?: string;
}

export function Table<T extends object>({
  data,
  columns,
  className,
}: TableProps<T>) {
  return (
    <div className={styles["table-container"]}>
      <table className={cn(styles["table"], className)}>
        <thead className={styles["table-head"]}>
          <tr className={cn(styles["table-row"], styles["table-row-head"])}>
            {columns.map((col) => (
              <th
                key={col.id}
                className={cn(
                  styles["table-cell"],
                  styles["table-cell-head"],
                  col.headerClassName
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={`row-${rowIndex}`} className={styles["table-row"]}>
              {columns.map((col) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const content = col.cell?.(row) ?? (row as any)[col.id];

                return (
                  <td
                    key={col.id}
                    className={cn(
                      styles["table-cell"],
                      styles["table-cell-body"],
                      col.cellClassName
                    )}
                  >
                    {content}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
