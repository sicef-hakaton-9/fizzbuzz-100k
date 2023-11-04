import styles from "./CurrentPlan.module.scss";

const CurrentPlan: React.FC = () => {
  return (
    <div className={styles.currPlan}>
      <span className={styles.currPlan__span}>Premium</span>
      <span className={`${styles.currPlan__bg}`}>30h left</span>
    </div>
  );
};
export default CurrentPlan;
