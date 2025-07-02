'use client';

import { ReactNode, createContext, useContext } from "react";
import { emailStore } from "./EmailStore";

const StoreContext = createContext({ emailStore });

export const useStore = () => useContext(StoreContext);

export default function MobxProvider({ children }: { children: ReactNode }) {
  return (
    <StoreContext.Provider value={{ emailStore }}>
      {children}
    </StoreContext.Provider>
  );
}