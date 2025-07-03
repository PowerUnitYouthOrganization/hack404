"use client";

import { User } from "@/db/schema";
import { createContext, useContext, useState } from "react";

interface HackerScannerContextType {
  isScanning: boolean;
  setIsScanning: (scanning: boolean) => void;
  lastUser: User | null;
  setLastUser: (user: User | null) => void;
}

const HackerScannerContext = createContext<
  HackerScannerContextType | undefined
>(undefined);

export const HackerScannerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [lastUser, setLastUser] = useState<User | null>(null);

  return (
    <HackerScannerContext.Provider
      value={{
        isScanning,
        setIsScanning,
        lastUser,
        setLastUser,
      }}
    >
      {children}
    </HackerScannerContext.Provider>
  );
};

export const useHackerScanner = () => {
  const context = useContext(HackerScannerContext);
  if (context === undefined) {
    throw new Error(
      "useHackerScanner must be used within a HackerScannerProvider",
    );
  }
  return context;
};
