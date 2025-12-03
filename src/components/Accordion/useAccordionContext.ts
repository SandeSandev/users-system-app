import { useContext } from "react";
import { AccordionContentContext } from "./AccordionContentContext";

export const useAccordionContentContext = () => {
  const context = useContext(AccordionContentContext);
  if (context === undefined) {
    throw new Error("Error! Should be used in AccordionContext!");
  }

  return context;
};