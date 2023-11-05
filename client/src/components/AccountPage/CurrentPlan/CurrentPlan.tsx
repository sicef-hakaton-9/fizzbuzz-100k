import { useSelector } from "react-redux";
import styles from "./CurrentPlan.module.scss";
import { RootState } from "../../../redux/store";
import {
  formatDuration,
  formatDurationText,
} from "../../../helpers/data.helper";

const CurrentPlan: React.FC = () => {
  const plan = useSelector((state: RootState) => state.subscription.value);

  return (
    <div className={styles.currPlan}>
      <span className={styles.currPlan__span}>{plan?.name}Obican plan</span>
      <span className={`${styles.currPlan__bg}`}>
        {formatDuration(50)} {formatDurationText(50)} preostalo
      </span>
    </div>
  );
};
export default CurrentPlan;
