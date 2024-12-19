import Image from "next/image";
import styles from "./SkilletLogo.module.css";

const SkilletLogo = () => {
  return (
    <Image
      className={styles.logo}
      src="logo-skillet.svg"
      alt="Caladine Logo"
      width={0}
      height={0}
      sizes="100vw"
    />
  );
};

export default SkilletLogo;
