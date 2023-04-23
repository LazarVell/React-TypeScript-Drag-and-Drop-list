import { createContext, useContext, useState } from "react";

export type OnDropType = (arg1: number, arg2: number) => void;
export type OnDragOverType = (arg: React.DragEvent<HTMLLIElement>) => void;

type DragContextType = {
  onDrop?: OnDropType;
  onDragOver?: OnDragOverType;
  setOnDrop: (value: OnDropType | undefined) => void;
  setOnDragOver: (value: OnDragOverType | undefined) => void;
};

const DragContext = createContext<DragContextType>({
  setOnDrop: () => {},
  setOnDragOver: () => {},
});

export const useDragContext = () => useContext(DragContext);

type DragContextProviderProps = {
  children: React.ReactNode;
};

export const DragProvider = ({ children }: DragContextProviderProps) => {
  const [onDrop, setOnDrop] = useState<OnDropType>();
  const [onDragOver, setOnDragOver] = useState<OnDragOverType>();

  const contextValue = {
    onDrop,
    onDragOver,
    setOnDrop,
    setOnDragOver,
  };

  return (
    <DragContext.Provider value={contextValue}>{children}</DragContext.Provider>
  );
};
