import FooterLogo from "../../Atoms/FooterLogo/FooterLogo";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <FooterLogo />
    </footer>
  );
};

export default Footer;
