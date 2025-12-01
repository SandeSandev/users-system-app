import { ArrowDownIcon } from "../../Icons/ArrowDownIcon";
import ArrowUpIcon from "../../Icons/ArrowUpIcon";
import { Button } from "../Button";
import { useAccordionContentContext } from "./useAccordionContext";

interface AccordItemToggleButtonProps {
  rowId: string;
}

export const AccordItemToggleButton: React.FC<AccordItemToggleButtonProps> = ({
  rowId,
}) => {
  const { toggleAccordionRow, isRowExpanded } = useAccordionContentContext();

  return (
    <Button
      type="button"
      variant="transparent"
      color="dark"
      size="sm"
      onClick={(e) => {
        e.stopPropagation();
        toggleAccordionRow(rowId);
      }}
      icon={isRowExpanded(rowId) ? <ArrowUpIcon /> : <ArrowDownIcon />}
    />
  );
};
