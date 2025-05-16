import { createContext, useContext, useState } from "react";

  const GridColWidthCtx = createContext([0, (width: number) => {}] as [number, (width: number) => void]);


  export const GridColWidthProvider = ({ children }: { children: React.ReactNode }) => {
    const [colWidth, setColWidth] = useState(0);

    return (
      <GridColWidthCtx.Provider value={[colWidth, setColWidth]}>
        {children}
      </GridColWidthCtx.Provider>
    );
  }

export const useGridColWidth = () => useContext(GridColWidthCtx);