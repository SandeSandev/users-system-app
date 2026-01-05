import { useState, type ReactNode } from "react";
import { AccordionContentContext } from "./AccordionContentContext";

interface AccordionProviderProps {
  hasMultiOpenedItems: boolean;
  children: ReactNode;
}

export const AccordionContentProvider = ({
  hasMultiOpenedItems,
  children,
}: AccordionProviderProps) => {
  const [activeRowIds, setActiveRowIds] = useState<Array<string | number>>([]);
  const toggleAccordionRow = (id: string) => {
    if (hasMultiOpenedItems) {
      setActiveRowIds((prevState) =>
        prevState.includes(id)
          ? prevState.filter((rowId) => rowId !== id)
          : [...prevState, id]
      );
    } else {
      setActiveRowIds((prevState) => (prevState[0] === id ? [] : [id]));
    }
  };

  const isRowExpanded = (rowId: string) => {
    if (activeRowIds.includes(rowId)) {
      return true;
    }
    return false;
  };

  const value = {
    isRowExpanded,
    toggleAccordionRow,
  };

  return (
    <AccordionContentContext.Provider value={value}>
      {children}
    </AccordionContentContext.Provider>
  );
};
