"use client";
import Link from "next/link";
import NavLogo from "@/app/components/Atoms/NavLogo/NavLogo";
import "./../../../globals.css";
import styles from "./AppNav.module.css";
import { usePathname } from "next/navigation";

export default function AppNav() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      <div className={styles.maxWidthNavContainer}>
        <Link className={styles.logoLink} href="/login">
          <NavLogo />
        </Link>
        <div className={styles.navLinksContainer}>
          <Link
            className={`${styles.navLink} ${pathname === "/allrecipes" ? styles.activeLink : ""}`}
            href="/allrecipes"
          >
            Recipes
          </Link>
          <Link
            className={`${styles.navLink} ${pathname === "/newrecipe" ? styles.activeLink : ""}`}
            href="/newrecipe"
          >
            New Recipe
          </Link>
          <Link
            className={`${styles.navLink} ${pathname === "/profile" ? styles.activeLink : ""}`}
            href="/profile"
          >
            Profile
          </Link>
        </div>
      </div>
    </nav>
  );
}
