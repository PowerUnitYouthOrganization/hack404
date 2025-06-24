import { createContext, useContext, useState } from "react";

interface HackerScannerContextType {
  isScanning: boolean;
  setIsScanning: (scanning: boolean) => void;
  lastScanID: string | null;
  setLastScanID: (id: string | null) => void;
}

const HackerScannerContext = createContext<HackerScannerContextType | undefined>(
  undefined
);

export const HackerScannerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [lastScanID, setLastScanID] = useState<string | null>(null);

  return (
    <HackerScannerContext.Provider 
      value={{
        isScanning,
        setIsScanning,
        lastScanID,
        setLastScanID,
      }}
    >
      {children}
    </HackerScannerContext.Provider>
  );
};

export const useHackerScanner = () => {
  const context = useContext(HackerScannerContext);
  if (context === undefined) {
    throw new Error("useHackerScanner must be used within a HackerScannerProvider");
  }
  return context;
};