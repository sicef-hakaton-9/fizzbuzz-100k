import styles from "./Header.module.scss";
import { CiSettings } from "react-icons/ci";

const Header: React.FC = () => {
  return (
    <div className={styles.account__header}>
      <h1>Profile</h1>
      <CiSettings size={28} color="#d70466" />
    </div>
  );
};
export default Header;
