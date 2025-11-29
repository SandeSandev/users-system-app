import type { ReactNode } from "react";
import styles from "./Button.module.css";
import cn from "classnames";

interface ButtonProps {
  variant: "primary" | "outline";
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit";
  className?: string;
  onClick?: () => void;
  children: ReactNode;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant,
  size = "md",
  type = "button",
  onClick,
  className,
  children,
  disabled = false,
  ...props
}) => {
  const classes = cn(
    styles.btn,
    variant === "primary" && styles["btn-primary"],
    size === "sm" && styles['btn-sm'],
    size === "md" && styles['btn-md'],
    size === "lg" && styles['btn-lg'],
    className
  );
  return (
    <button
      className={classes}
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
