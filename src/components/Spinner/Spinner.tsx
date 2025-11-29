import React from "react";
import styles from "./Spinner.module.css";
import cn from "classnames";

interface SpinnerProps {
  size: 'sm' | 'md' | 'lg';
  color?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  color = "#3498db",
}) => {
  const classes = cn(
    styles['spinner'],
    size === 'sm' && styles['spinner-sm'],
    size === 'md' && styles['spinner-md'],
    size === 'lg' && styles['spinner-lg'],
  )
  return (
    <div
      className={classes}
      style={{
        borderTopColor: color,
      }}
    />
  );
};