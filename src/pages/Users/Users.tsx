import { useEffect } from "react";
import { useAppDispatch } from "../../store/hooks/useAppDispatch";
import { useAppSelector } from "../../store/hooks/useAppSelector";
import { fetchUsers } from "../../store/slices/users-slice";
import { Accordion } from "../../components/Accordion";
import { AccordionItem } from "../../components/Accordion/AccordionItem";
import { UserInfo } from "./UserInfo";
import { Spinner } from "../../components/Spinner/Spinner";

const Users: React.FC = () => {
  const dispatch = useAppDispatch();

  const { list, loading, error } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // ADD PROPER STYLES TO THESE!!!!
  if (loading) return <Spinner size="sm" />;
  if (error) return <p>Error: {error}</p>;

  if (!list || list.length === 0) {
    return <p>No users found.</p>;
  }

  return (
    <Accordion>
      {list.map((user) => (
        <AccordionItem id={user.id.toString()} header={user.username}>
          <UserInfo key={`user-${user.id}`} user={user} showSeePosts></UserInfo>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default Users;
