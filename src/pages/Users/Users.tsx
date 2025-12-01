import { useEffect } from "react";
import { useAppDispatch } from "../../store/hooks/useAppDispatch";
import { useAppSelector } from "../../store/hooks/useAppSelector";
import { fetchUsers } from "../../store/slices/users-slice";
import { Accordion } from "../../components/Accordion";
import { AccordionItem } from "../../components/Accordion/AccordionItem";
import { UserInfo } from "./UserInfo";

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
      {list.map(({ id, username, email, address }) => (
        <AccordionItem id={id.toString()} header={username}>
          <UserInfo
            userId={id.toString()}
            key={`user-${id}`}
            userName={username}
            email={email}
            addressCity={address.city}
            addressStreet={address.street}
            addressSuite={address.zipcode}
          ></UserInfo>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default Users;
