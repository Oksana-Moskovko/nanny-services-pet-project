import { Link } from "react-router";
import css from "./HomePage.module.css";
import { FiCheck } from "react-icons/fi";
import { GoArrowUpRight } from "react-icons/go";

export default function HomePage() {
  return (
    <section className={css.hero}>
      <div className={css.textContainer}>
        <div className={css.heroText}>
          <h1 className={css.heroTitle}>Make Life Easier for the Family:</h1>
          <p className={css.heroDescription}>
            Find Babysitters Online for All Occasions
          </p>
          <Link className={css.heroBtn} to="/nannies">
            Get started
            <GoArrowUpRight className={css.iconArrow} size={25} />
          </Link>
        </div>
      </div>
      <div className={css.imageContainer}>
        <div className={css.iconContainer}>
          <p className={css.icon}>
            <FiCheck size={30} />
          </p>
          <div>
            <p className={css.iconConTexst}>Experienced nannies</p>
            <p className={css.iconDescript}>15,000</p>
          </div>
        </div>
      </div>
    </section>
  );
}
