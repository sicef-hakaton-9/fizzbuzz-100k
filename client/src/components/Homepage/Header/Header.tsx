import styles from "./Header.module.scss";
import logo from "../../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import Button from "../../html/button/Button";

const Header = () => {
  const navigate = useNavigate();

  const handleGoRegister = () => {
    navigate("/sign-in");
  };
  return (
    <header className={styles.header}>
      <img src={logo} alt="Smart Ride logo" className={styles.logo} />
      <Button onClick={handleGoRegister} text={"Kreiraj nalog"} />
    </header>
  );
};
export default Header;
