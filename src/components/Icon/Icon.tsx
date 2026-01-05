export interface IconProps {
  size?: number;
  color?: string;
  viewBox?: string;
  children?: React.ReactNode;
}

export const Icon = ({
  size = 24,
  color,
  viewBox = " 0 0 24 24",
  children,
  ...rest
}: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      fill={color}
      {...rest}
    >
      {children}
    </svg>
  );
};
