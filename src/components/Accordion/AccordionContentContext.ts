import { createContext } from "react";

interface AccordionContentContextValues {
  isRowExpanded: (rowId: string) => boolean;
  toggleAccordionRow: (id: string) => void;
}

export const AccordionContentContext = createContext<AccordionContentContextValues>({
  isRowExpanded: () => false,
  toggleAccordionRow: () => {},
});
