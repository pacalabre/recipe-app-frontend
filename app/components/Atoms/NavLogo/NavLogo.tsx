import Image from "next/image";
import styles from "./NavLogo.module.css";

const NavLogo = () => {
  return (
    <Image
      className={styles.logo}
      src="nav-logo.svg"
      alt="Caladine Logo"
      width={0}
      height={0}
      sizes="100vw"
    />
  );
};

export default NavLogo;
