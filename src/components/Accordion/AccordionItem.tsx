import styles from "./Accordion.module.css";
import { AccordItemToggleButton } from "./AccordItemToggleButton";
import { useAccordionContentContext } from "./useAccordionContext";

interface AccordionItemProps {
  header: string;
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  id,
  header,
  children,
}) => {
  const { isRowExpanded, toggleAccordionRow } = useAccordionContentContext();

  return (
    <>
      <div
        className={styles["accordion-item-header"]}
        onClick={() => toggleAccordionRow(id)}
      >
        <h3>{header}</h3>
        <AccordItemToggleButton rowId={id} />
      </div>
      {isRowExpanded(id) && (
        <div className={styles["accorion-item-content"]}>{children}</div>
      )}
    </>
  );
};
