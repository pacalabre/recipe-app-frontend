import SkilletImage from "../SkilletImage/SkilletImage";

import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loadingImage}>
        <SkilletImage></SkilletImage>
      </div>
    </div>
  );
};

export default Loader;
