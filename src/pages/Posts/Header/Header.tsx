import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/Button";

import styles from "./Header.module.css";

export const BackButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles["header-container"]}>
      <Button
        type="button"
        variant="transparent"
        color="dark"
        onClick={() => navigate(-1)}
      >
        ← Go to Users
      </Button>

    </div>
  );
};
