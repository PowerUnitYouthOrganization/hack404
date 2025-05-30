import React from "react";
import { useGridColWidth } from "../app/contexts/GridCtx";

interface ColSectionProps {
  width: number;
  offset?: string;
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

/**
 * Renders a section with a calculated width based on grid columns.
 * @param width Number of columns to span
 * @param offset Optional CSS calc string for additional offset (e.g. '2rem')
 */

const ColSection: React.FC<ColSectionProps> = ({
  width,
  offset = "0px",
  className = "",
  children = undefined,
  style = {},
}) => {
  const [colWidth] = useGridColWidth();
  // (colWidth * width) + (1.5rem * (width-1)) + offset
  const computedWidth = `calc((${colWidth}px * ${width}) + (1.5rem * ${width - 1}) + ${offset})`;
  return (
    <div className={className} style={{ width: computedWidth, ...style }}>
      {children}
    </div>
  );
};

export default ColSection;
