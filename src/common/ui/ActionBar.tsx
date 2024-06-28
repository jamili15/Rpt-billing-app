import { ReactNode } from "react";

type ActionBarProps = {
  children: ReactNode;
  className?: string;
};

export const ActionBar: React.FC<ActionBarProps> = ({
  children,
  className = "justify-between",
}) => {
  return <div className={`flex flex-row ${className}`}>{children}</div>;
};
