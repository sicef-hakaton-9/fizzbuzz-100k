import styles from "./CurrentPlan.module.scss";
import {
  formatDuration,
  formatDurationText,
} from "../../../helpers/data.helper";
import { useLayoutEffect, useState } from "react";
import { ApiService } from "../../../services/api.service";

const CurrentPlan: React.FC = () => {
  const [plan, setPlan] = useState<any>();

  useLayoutEffect(() => {
    (async () => {
      const { data } = await ApiService.getSubscriptionByUserAsync();
      setPlan(data.subscription);
    })();
  }, []);

  return (
    <div className={styles.currPlan}>
      <span className={styles.currPlan__span}>{plan?.plan?.name}</span>
      <span className={`${styles.currPlan__bg}`}>
        {formatDuration(plan?.time_left ?? 0)}{" "}
        {formatDurationText(plan?.time_left ?? 0)} preostalo
      </span>
    </div>
  );
};
export default CurrentPlan;
