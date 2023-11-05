import styles from "./LeaderboardItem.module.scss";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { IoPersonCircleOutline } from "react-icons/io5";

interface LeaderboardItemProps {
  place: number;
  name: string;
  time: string;
  arrow: "up" | "down";
  hours_to_add: any;
}

const LeaderboardItem: React.FC<LeaderboardItemProps> = ({
  place,
  name,
  time,
  arrow,
  hours_to_add,
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
      <div className={styles.item__group} style={{ width: 20 }}>
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
      <span style={{ width: 90 }}>{time} {hours_to_add !== 0 ?  (<b>+ {hours_to_add}</b>) : ""}</span>
    </div>
  );
};
export default LeaderboardItem;
