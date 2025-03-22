import SkilletLogo from "../SkilletLogo/SkilletLogo";
import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loadingImage}>
        <SkilletLogo></SkilletLogo>
      </div>
    </div>
  );
};

export default Loader;
