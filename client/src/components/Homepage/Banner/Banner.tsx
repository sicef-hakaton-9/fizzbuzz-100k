import styles from "./Banner.module.scss";
import phoneImg from "../../../assets/Mobile App.png";

const Banner = () => {
  return (
    <div className={styles.banner}>
      <img src={phoneImg} alt="Phone image" className={styles.banner__img} />
      <div className={styles.banner__text}>
        <h3>Dobrodošli u Smart Ride</h3>
        <h1>Istražite grad na dva točka.</h1>
        <p>
          Bez obzira da li si turista koji želi da istraži skrivene dragulje
          grada ili lokalac koji traži brz i ekološki način prevoza, mi smo tu
          da ti pružimo kvalitetne bicikle i vrhunsku uslugu.
        </p>
      </div>
    </div>
  );
};
export default Banner;
