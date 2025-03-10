import "./FlexGroup.css";

interface FlexGroupProps {
  className?: string;
  children: React.ReactNode;
  flexDirection?: "row" | "row-reverse" | "column" | "column-reverse";
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
  alignItems?: "stretch" | "flex-start" | "flex-end" | "center";
  gap?: string;
  margin?: string;
}

function FlexGroup({
  className,
  children,
  flexDirection,
  justifyContent,
  alignItems,
  gap,
  margin,
}: FlexGroupProps) {
  return (
    <div
      className={`flex-group ${className}`}
      style={{
        flexDirection: flexDirection,
        justifyContent: justifyContent,
        alignItems: alignItems,
        gap: gap,
        margin: margin,
      }}
    >
      {children}
    </div>
  );
}

export default FlexGroup;
