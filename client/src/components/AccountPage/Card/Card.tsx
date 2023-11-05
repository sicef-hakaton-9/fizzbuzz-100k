import styles from "./Card.module.scss";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { AiOutlineShareAlt } from "react-icons/ai";
import profilePic from "../../../assets/profile-pic.jpg";
import Button from "../../html/button/Button";
import { useNavigate } from "react-router";
import useUser from "../../../hooks/useUser";

const Card: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigateRoute = () => {
    navigate("/choose-subscription");
  };

  const user = useUser();

  return (
    <div className={styles.card}>
      <div className={styles.card__header}>
        <RiVerifiedBadgeFill size={26} color="#cfcece" />
        <AiOutlineShareAlt size={26} />
      </div>
      <div className={styles.card__image}>
        <img src={profilePic} alt="User" />
      </div>
      <div className={styles.card__credentials}>
        <p className={styles.card__name}>
          {user?.first_name} {user?.last_name}
        </p>
      </div>
      <p className={styles.card__email}>{user?.email}</p>
      <div className={styles.card__group}>
        <div className={styles.card__btn}>
          <Button text="PROMENI PLAN" onClick={handleNavigateRoute} />
        </div>
        <div className={styles.card__btn}>
          <Button revert={true} text="LOGOUT" onClick={handleNavigateRoute} />
        </div>
      </div>
    </div>
  );
};
export default Card;
