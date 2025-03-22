import Image from "next/image";
import styles from "./SkilletLogo.module.css";

const SkilletLogo = () => {
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

export default SkilletLogo;
