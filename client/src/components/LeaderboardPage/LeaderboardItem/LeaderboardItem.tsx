import styles from "./LeaderboardItem.module.scss";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { IoPersonCircleOutline } from "react-icons/io5";

interface LeaderboardItemProps {
  place: number;
  name: string;
  time: string;
  arrow: "up" | "down";
}

const LeaderboardItem: React.FC<LeaderboardItemProps> = ({
  place,
  name,
  time,
  arrow,
}) => {
  return (
    <div
      className={`${styles.item} ${
        place === 1
          ? styles.item__gold
          : place === 2
          ? styles.item__silver
          : place === 3
          ? styles.item__bronze
          : styles.item__default
      }`}
    >
      <div className={styles.item__group}>
        {arrow === "up" ? (
          <IoIosArrowUp size={20} color="var(--green)" />
        ) : (
          <IoIosArrowDown size={20} color="var(--red)" />
        )}
        <span>{place}</span>
      </div>
      <div className={styles.item__group}>
        <IoPersonCircleOutline size={36} />
        <span>{name}</span>
      </div>
      <span>{time}</span>
    </div>
  );
};
export default LeaderboardItem;
