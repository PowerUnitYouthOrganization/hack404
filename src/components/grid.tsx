import { useEffect, useState, useRef } from "react";
import { useGridColWidth } from "../app/contexts/GridCtx";

export default function Grid() {
  const [type, setType] = useState("desktop"); // default to desktop
  const [colWidth, setColWidth] = useGridColWidth(); // default to 0
  const firstColumnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateType = () => {
      if (typeof window !== "undefined") {
        const width = window.innerWidth;
        if (width < 640) setType("mobile");
        else if (width < 1500) setType("tablet");
        else setType("desktop");
      }
    };

    updateType(); // initial call
    window.addEventListener("resize", updateType);
    return () => window.removeEventListener("resize", updateType);
  }, []);

  // Effect to measure and set the column width
  useEffect(() => {
    const measureColumnWidth = () => {
      if (firstColumnRef.current) {
        const width = firstColumnRef.current.getBoundingClientRect().width;
        setColWidth(width);
        console.log(`Column width: ${width}px`);
      }
    };

    measureColumnWidth();
    window.addEventListener("resize", measureColumnWidth);
    return () => window.removeEventListener("resize", measureColumnWidth);
  }, [setColWidth, type]); // Re-measure when type changes

  console.log(`${type} grid rendered`);

  // Define configuration based on type
  const columns = type === "mobile" ? 2 : type === "tablet" ? 4 : 5;
  // const maxWidthStyle =
  // 	type === "desktop" ? { maxWidth: `calc(100vh * (7 / 3))` } : undefined;

  return (
    <div
      className={`fixed inset-0 z-10 grid h-screen w-full px-6 desktop:px-[64px] gap-6`}
      style={{
        // ...maxWidthStyle,
        gridTemplateColumns: `repeat(var(--grid-columns), 1fr)`,
      }}
    >
      {Array.from({ length: columns }).map((_, i) => (
        <div
          key={i}
          ref={i === 0 ? firstColumnRef : undefined}
          className="border-x"
          style={{ borderColor: "rgba(48, 242, 242, 0.2)" }}
        />
      ))}
    </div>
  );
}
