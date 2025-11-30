import { useEffect } from "react";
import { Accordion } from "../components/Accordion";
import { AccordionItem } from "../components/Accordion/AccordionItem";
import { UserCard } from "../components/UserCard/UserCard";
import { useAppSelector } from "../store/hooks/useAppSelector";
import { useAppDispatch } from "../store/hooks/useAppDispatch";
import { fetchUsers } from "../store/slices/users-slice";

const Users: React.FC = () => {
  const dispatch = useAppDispatch();

  const { list, loading, error } = useAppSelector((state) => state);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // ADD PROPER STYLES TO THESE!!!!
  if (loading) return <p>Loading…</p>;
  if (error) return <p>Error: {error}</p>;

  if (!list || list.length === 0) {
    return <p>No users found.</p>;
  }

  return (
    <Accordion>
      {list.map((user) => (
        <AccordionItem id={user.id.toString()} header={user.name}>
          <UserCard
            userName={user.username}
            email={user.email}
            addressCity={user.address.city}
            addressStreet={user.address.street}
            addressSuite={user.address.zipcode}
          ></UserCard>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default Users;
