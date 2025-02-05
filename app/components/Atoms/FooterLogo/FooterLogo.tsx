import Image from "next/image";
import "./../../../globals.css";
import styles from "./FooterLogo.module.css";

const FooterLogo = () => {
  return (
    <Image
      className={styles.logo}
      src="footer-logo.svg"
      alt="Caladine Logo"
      width={0}
      height={0}
      sizes="100vw"
    />
  );
};

export default FooterLogo;
