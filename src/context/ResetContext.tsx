'use client'

import { createContext, useContext, useState, ReactNode } from 'react';


interface ResetContextType {
  reset: boolean;
  setReset: React.Dispatch<React.SetStateAction<boolean>>;
}

const ResetContext = createContext<ResetContextType | undefined>(undefined);

interface ResetProviderProps {
  children: ReactNode;
}

export const ResetProvider: React.FC<ResetProviderProps> = ({ children }) => {
  const [reset, setReset] = useState<boolean>(false);
  function resetLop(){
    if(reset){
      setTimeout(() => {
        setReset(false)
      }, 800);
    }
  }
  resetLop()
  return (
    <ResetContext.Provider value={{ reset, setReset }}>
      {children}
    </ResetContext.Provider>
  );
};

export const useResetContext = (): ResetContextType => {
    const context = useContext(ResetContext);
  
    if (!context) {
      throw new Error('useResetContext must be used within a ResetProvider');
    }
  
    return context;
  };
