import styles from "./Leaderboard.module.scss";
import LeaderboardHeader from "../../components/LeaderboardPage/LeaderboardHeader/LeaderboardHeader";
import Top3 from "../../components/LeaderboardPage/Top3/Top3";
import LeaderboardItem from "../../components/LeaderboardPage/LeaderboardItem/LeaderboardItem";
import Footer from "../../components/Footer/Footer";
import { useState, useLayoutEffect } from "react";
import { ApiService } from "../../services/api.service";
import { ILeaderboardUser } from "../../models/user";

const Leaderboard: React.FC = () => {
  const second =
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1888&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const first =
    "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=1886&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const third =
    "https://plus.unsplash.com/premium_photo-1674777843203-da3ebb9fbca0?auto=format&fit=crop&q=80&w=1935&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const [users, setUsers] = useState<ILeaderboardUser[]>([]);

  useLayoutEffect(() => {
    (async () => {
      const { data } = await ApiService.getDashboardStatisticsAsync();

      if (data) {
        setUsers(data.users);
      }
    })();
  }, []);

  return (
    <>
      <main className={styles.leaderboard}>
        <LeaderboardHeader />
        <Top3 first={first} second={second} third={third} />
        {users.map((item, i) => (
          <LeaderboardItem
            key={i}
            place={i + 1}
            name={item.first_name + " " + item.last_name}
            arrow={i % 2 === 0 ? "up" : "down"}
            time={item.hours.toString()}
            hours_to_add={item.hours_to_add}
          />
        ))}
      </main>
      <Footer />
    </>
  );
};
export default Leaderboard;
