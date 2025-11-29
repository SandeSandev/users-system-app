import { Accordion } from "../components/Accordion";
import { AccordionItem } from "../components/Accordion/AccordionItem";
import { UserCard } from "../components/UserCard/UserCard";

const Users: React.FC = () => {
  return (
    <>
      <Accordion>
        <AccordionItem id="1" header="Test 1">
          <UserCard
            userName="Test"
            email="test@gmail.com"
            addressCity="Test"
            addressStreet="test"
            addressSuite="test"
          ></UserCard>
        </AccordionItem>
        <AccordionItem id="2" header="Test 1">
          <UserCard
            userName="Test"
            email="test@gmail.com"
            addressCity="Test"
            addressStreet="test"
            addressSuite="test"
          ></UserCard>        </AccordionItem>
      </Accordion>
    </>
  );
};

export default Users;
