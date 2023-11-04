import styles from "./Leaderboard.module.scss";
import LeaderboardHeader from "../../components/LeaderboardPage/LeaderboardHeader/LeaderboardHeader";

const Leaderboard: React.FC = () => {
  return (
    <>
      <main className={styles.leaderboard}>
        <LeaderboardHeader />
      </main>
    </>
  );
};
export default Leaderboard;
