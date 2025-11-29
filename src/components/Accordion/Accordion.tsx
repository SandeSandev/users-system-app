import { type ReactNode } from "react";
import { AccordionContentProvider } from "./AccordionProvider";
import styles from "./Accordion.module.css";
interface AccordionProps {
  hasMultiOpenedItems?: boolean;
  children: ReactNode;
}

export const Accordion: React.FC<AccordionProps> = ({
  hasMultiOpenedItems = false,
  children,
}) => {
  return (
    <div className={styles["accordion"]}>
      <AccordionContentProvider hasMultiOpenedItems={hasMultiOpenedItems}>
        {children}
      </AccordionContentProvider>
    </div>
  );
};
