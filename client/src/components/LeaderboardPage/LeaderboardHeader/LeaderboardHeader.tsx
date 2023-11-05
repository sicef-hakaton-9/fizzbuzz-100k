import styles from "./Leaderboard.module.scss";
import { BiLeftArrowAlt } from "react-icons/bi";
import { AiOutlineShareAlt } from "react-icons/ai";
import { useNavigate } from "react-router";

const LeaderboardHeader: React.FC = () => {
  const navigator = useNavigate();

  const handleNavigateHome = () => {
    navigator("/");
  };

  return (
    <div className={styles.leaderboard__header}>
      <BiLeftArrowAlt size={24} onClick={handleNavigateHome} />
      <span className={styles.leaderboard__span}>Leaderboard</span>
      <AiOutlineShareAlt size={24} />
    </div>
  );
};
export default LeaderboardHeader;
