import Image from "next/image";
import styles from "./SkilletImage.module.css";

const SkilletImage = () => {
  return (
    <Image
      className={styles.logo}
      src="cast-iron-icon.svg"
      alt="Caladine Logo"
      width={0}
      height={0}
      sizes="100vw"
    />
  );
};

export default SkilletImage;
