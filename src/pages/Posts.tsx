import { UserCard } from "../components/UserCard/UserCard";

const Posts: React.FC = () => {
  return (
    <>
      <UserCard
        userName="Test"
        email="test@gmail.com"
        addressCity="Test"
        addressStreet="test"
        addressSuite="test"
      ></UserCard>
    </>
  );
};

export default Posts;
