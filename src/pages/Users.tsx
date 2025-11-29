import { Accordion } from "../components/Accordion";
import { AccordionItem } from "../components/Accordion/AccordionItem";

const Users: React.FC = () => {
  return (
    <>
      <Accordion>
        <AccordionItem id="1" header="Test 1">
          dsadasdadsadas
        </AccordionItem>
        <AccordionItem id="2" header="Test 1">
          dsadasdadsadas
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default Users;
