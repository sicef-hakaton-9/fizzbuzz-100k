import styles from "./Top3.module.scss";
import crown from "../../../assets/crown.png";

interface Top3Props {
  first: string;
  second: string;
  third: string;
}

const Top3: React.FC<Top3Props> = ({ first, second, third }) => {
  return (
    <div className={styles.top}>
      <img src={crown} alt="Kruna" className={styles.crown} />
      <div className={styles.top__content}>
        <img
          src={second}
          alt="2nd place"
          className={`${styles.img} ${styles.second}`}
        />
        <img
          src={first}
          alt="1st place"
          className={`${styles.img} ${styles.first}`}
        />
        <img src={third} alt="3rd place" className={`${styles.img}`} />
      </div>
    </div>
  );
};
export default Top3;
