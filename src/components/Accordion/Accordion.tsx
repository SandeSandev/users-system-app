import { type ReactNode } from "react";
import { AccordionContentProvider } from "./AccordionProvider";

interface AccordionProps {
  hasMultiOpenedItems?: boolean;
  children: ReactNode;
}

export const Accordion: React.FC<AccordionProps> = ({
  hasMultiOpenedItems = false,
  children,
}) => {

  return (
    <AccordionContentProvider hasMultiOpenedItems={hasMultiOpenedItems}>
      {children}
    </AccordionContentProvider>
  );
};
