"use client";
import Link from "next/link";
import NavLogo from "@/app/components/Atoms/NavLogo/NavLogo";
import "./../../../globals.css";
import styles from "./AppNav.module.css";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function AppNav() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleOutsideClick = (event: { target: Node | null }) => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const mobileNav = document.querySelector("nav");
    if (mediaQuery.matches && mobileNav && !mobileNav.contains(event.target)) {
      setMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick as any);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick as any);
    };
  }, []);

  return (
    <nav className={styles.nav}>
      <div className={styles.maxWidthNavContainer}>
        <Link className={styles.logoLink} href="/login">
          <NavLogo />
        </Link>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`${styles.hamburgerMenu} ${mobileMenuOpen ? styles.close : ""}`}
        >
          <span className={`${styles.mobileIconLine} ${styles.topLine}`}></span>
          <span
            className={`${styles.mobileIconLine} ${styles.middleLine}`}
          ></span>
          <span
            className={`${styles.mobileIconLine} ${styles.bottomLine}`}
          ></span>
        </button>
        <div
          className={`${styles.navLinksContainer} ${mobileMenuOpen ? "" : styles.hide}`}
        >
          <Link
            className={`${styles.navLink} ${pathname === "/allrecipes" ? styles.activeLink : ""}`}
            href="/allrecipes"
            onClick={() => {
              setMobileMenuOpen(false);
            }}
          >
            Recipes
          </Link>
          <Link
            className={`${styles.navLink} ${pathname === "/newrecipe" ? styles.activeLink : ""}`}
            href="/newrecipe"
            onClick={() => {
              setMobileMenuOpen(false);
            }}
          >
            New Recipe
          </Link>
          <Link
            className={`${styles.navLink} ${pathname === "/profile" ? styles.activeLink : ""}`}
            href="/profile"
            onClick={() => {
              setMobileMenuOpen(false);
            }}
          >
            Profile
          </Link>
        </div>
      </div>
    </nav>
  );
}
