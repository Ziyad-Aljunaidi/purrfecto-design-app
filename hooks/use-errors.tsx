"use client";
// errors-context.tsx
import { createContext, useContext, useState, ReactNode } from "react";

type ShotErrors = {
  title:string;
  media:string;
  description:string;
  tags:string;
}

const initialShotErrors: ShotErrors = {
  title: "",
  media: "",
  description: "",
  tags: "",
};

type ShotErrorsContextType = {
  errors: ShotErrors;
  setError: (field: keyof ShotErrors, message: string) => void;
  clearError: (field: keyof ShotErrors) => void;
  clearAllErrors: () => void;
};


const ShotErrorsContext = createContext<ShotErrorsContextType | undefined>(undefined);

export function ShotErrorsProvider({ children }: { children: ReactNode }) {
  const [errors, setErrors] = useState<ShotErrors>(initialShotErrors);

  const setError = (field: keyof ShotErrors, message: string) => {
    setErrors((prev) => ({ ...prev, [field]: message }));
  };

  const clearError = (field: keyof ShotErrors) => {
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const clearAllErrors = () => {
    setErrors(initialShotErrors);
  };

  return (
    <ShotErrorsContext.Provider value={{ errors, setError, clearError, clearAllErrors }}>
      {children}
    </ShotErrorsContext.Provider>
  );
}


export function useShotErrors() {
  const context = useContext(ShotErrorsContext);
  if (!context) {
    throw new Error("useErrors must be used within an ErrorsProvider");
  }
  return context;
}