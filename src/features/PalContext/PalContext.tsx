import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { PalContextType } from "../../types/PalContextType";
import { PalDetails } from "../../types/PalDetails";
import { fetchPalData } from "./fetchPalData";
import { initializeDatabase } from "./initializeDatabase";

const PalContext = createContext<PalContextType | undefined>(undefined);

export const PalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [palList, setPalList] = useState<PalDetails[]>([]);

  useEffect(() => {
    const initialize = async () => {
      await initializeDatabase();
    };

    const fetchPalList = async () => {
      const fetchedPalList = await fetchPalData();
      setPalList(fetchedPalList);
    };

    initialize().then(() => {
      fetchPalList();
    });
  }, []);

  return <PalContext.Provider value={{ palList }}>{children}</PalContext.Provider>;
};

export const usePalContext = (): PalContextType => {
  const context = useContext(PalContext);

  if (!context) {
    throw new Error("usePalContext must be used within a PalProvider");
  }
  return context;
};
