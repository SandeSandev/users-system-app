import type { ReactNode } from "react";
import styles from "./Button.module.css";
import cn from "classnames";

interface ButtonProps {
  variant: "primary" | "outline" | "outline-primary" | "transparent-dark";
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit";
  className?: string;
  onClick?: () => void;
  children?: ReactNode;
  disabled?: boolean;
  icon?: React.ReactElement;
  iconPosition?: "left" | "right";
}

export const Button: React.FC<ButtonProps> = ({
  variant,
  size = "md",
  type = "button",
  onClick,
  className,
  children,
  disabled = false,
  icon,
  iconPosition = "left",
  ...props
}) => {
  const classes = cn(
    styles.btn,
    styles[`btn-${variant}`],
    styles[`btn-${size}`],

    icon && styles["btn-with-icon"],
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
      {icon && iconPosition === "left" && icon}
      <span>{children}</span>
      {icon && iconPosition === "right" && icon}
    </button>
  );
};
