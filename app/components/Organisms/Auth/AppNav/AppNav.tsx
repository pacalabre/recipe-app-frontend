"use client";
import Link from "next/link";
import NavLogo from "@/app/components/Atoms/NavLogo/NavLogo";
import styles from "./AppNav.module.css";
export default function AppNav() {
  return (
    <nav className={styles.nav}>
      <div className={styles.maxWidthNavContainer}>
        <Link className={styles.logoLink} href="/login">
          <NavLogo />
        </Link>
        <div className={styles.navLinksContainer}>
          <Link href="/allrecipes">Recipes</Link>
          <Link href="/newrecipe">New Recipe</Link>
          <Link href="/profile">Profile</Link>
        </div>
      </div>
    </nav>
  );
}
