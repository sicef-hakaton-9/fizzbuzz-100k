import styles from "./Card.module.scss";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { AiOutlineShareAlt } from "react-icons/ai";
import profilePic from "../../../assets/profile-pic.jpg";
import Button from "../../html/button/Button";
import { useNavigate } from "react-router";

const Card: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigateRoute = () => {
    navigate("/choose-subscription");
  };

  return (
    <div className={styles.card}>
      <div className={styles.card__header}>
        <RiVerifiedBadgeFill size={26} color="#cfcece" />
        <AiOutlineShareAlt size={26} />
      </div>
      <div className={styles.card__image}>
        <img src={profilePic} alt="Profile picture" />
      </div>
      <div className={styles.card__credentials}>
        <p className={styles.card__name}>Petar Petrovic</p>
      </div>
      <p className={styles.card__email}>user@gmail.com</p>
      <div className={styles.card__btn}>
        <Button text="Buy Subscription" onClick={handleNavigateRoute} />
      </div>
    </div>
  );
};
export default Card;
