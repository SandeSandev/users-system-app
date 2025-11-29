import { useAccordionContentContext } from "./useAccordionContext";

interface AccordItemToggleButtonProps {
  rowId: string;
}

export const AccordItemToggleButton: React.FC<AccordItemToggleButtonProps> = ({
  rowId,
}) => {
  const { toggleAccordionRow } = useAccordionContentContext();


  return (
    <button type="button" onClick={() => toggleAccordionRow(rowId)}>
      click
    </button>
  );
};
