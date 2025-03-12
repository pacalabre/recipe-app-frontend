"use client";
import Link from "next/link";
import NavLogo from "@/app/components/Atoms/NavLogo/NavLogo";
import "./../../../globals.css";
import styles from "./AppNav.module.css";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useUser } from "@/app/contextApi/UserProvider";
import Menu from "@mui/material/Menu";
import { logoutUser } from "@/app/services/auth-service";
import { MenuItem } from "@mui/material";
import Button from "@/app/components/Atoms/Button/Button";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export default function AppNav() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, setUser } = useUser();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    try {
      const response = await logoutUser();
      if (response) {
        setUser(null);
        router.push("/login");
      }
    } catch (error) {
      console.log(`There was an error when logging out the user: ${error}`);
    }
  };

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
          {user ? (
            <div className={styles.userMenu}>
              <button className={styles.userDropdownBtn} onClick={handleClick}>
                <span>{user.name.slice(0, 1).toUpperCase()}</span>
              </button>
              <Link
                className={`${styles.navLink} ${styles.mobileLink}`}
                href="/profile"
                onClick={() => {
                  setMobileMenuOpen(false);
                }}
              >
                Profile
              </Link>
              <Button
                label="logout"
                varient="primary"
                className={`${styles.navLink} ${styles.mobileLink}`}
                onclick={logout}
              />
            </div>
          ) : (
            <Link className={styles.navLink} href="/login">
              Login
            </Link>
          )}
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            slotProps={{
              paper: {
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem
              sx={{ display: "flex", justifyContent: "flex-end" }}
              onClick={() => router.push("/profile")}
            >
              Profile
            </MenuItem>
            <MenuItem onClick={logout}>
              <FontAwesomeIcon
                className={styles.dropdownIcon}
                icon={faRightFromBracket}
              />
              Logout
            </MenuItem>
          </Menu>
        </div>
      </div>
    </nav>
  );
}
