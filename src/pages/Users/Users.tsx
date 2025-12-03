import { useEffect } from "react";
import { useAppDispatch } from "../../store/hooks/useAppDispatch";
import { useAppSelector } from "../../store/hooks/useAppSelector";
import { fetchUsers } from "../../store/slices/users-slice";
import { Accordion } from "../../components/Accordion";
import { AccordionItem } from "../../components/Accordion/AccordionItem";
import { UserInfo } from "./UserInfo";
import { Spinner } from "../../components/Spinner/Spinner";
import styles from "./Users.module.css";
import { notifyApiError } from "../../utils/notifyApiErro";
import { NoData } from "../../components/NoData/NoData";
const Users: React.FC = () => {
  const dispatch = useAppDispatch();

  const { list, loading, error } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      notifyApiError(error);
    }
  }, [error]);
  return (
    <div className={styles['container']}>
      {loading ? (
        <div className={styles['loading-wrapper']}>
          <Spinner size="lg" />
        </div>
      ) : list?.length === 0 ? (
        <NoData title="No users found" />
      ) : (
        <Accordion>
          {list?.map((user) => (
            <AccordionItem
              key={user.id}
              id={user.id.toString()}
              header={user.username}
            >
              <UserInfo user={user} showSeePosts />
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
};

export default Users;
