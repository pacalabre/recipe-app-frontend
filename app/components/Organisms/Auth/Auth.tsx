"use client";
import { useState } from "react";
import Input from "../../Atoms/Input/Input";
import Button from "../../Atoms/Button/Button";
import styles from "./Auth.module.css";
import Link from "next/link";
import {
  registerUser,
  loginUser,
  getLoggedinUserInfo,
  logoutUser,
} from "@/app/services/auth-service";

const AuthForm = () => {
  const [registerName, setRegisterName] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [formToShow, setFormToShow] = useState("login");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loggedinUser, setLoggedinUser] = useState(null);

  const register = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    try {
      const response = await registerUser(
        registerName,
        registerUsername,
        registerEmail,
        registerPassword
      );
    } catch (error) {
      console.log(`There was an error registering this user: ${error}`);
    }
  };

  const login = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    try {
      const response = await loginUser(loginEmail, loginPassword);
    } catch (error) {
      console.log(`There was an error while logging in the user: ${error}`);
    }
  };

  const getLoggedinUser = async (event: React.MouseEvent<HTMLElement>) => {
    try {
      const response = await getLoggedinUserInfo();
    } catch (error) {
      console.log(
        `There was an error when trying to get the logged in user data: ${error}`
      );
    }
  };

  const logout = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    try {
      const response = logoutUser();
    } catch (error) {
      console.log(`There was an error when logging out the user: ${error}`);
    }
  };

  return (
    <>
      {formToShow === "register" ? (
        <form className={styles.authForm}>
          <h2>Register</h2>
          <label>Name:</label>
          <Input
            onchange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setRegisterName(event.target.value)
            }
          />
          <label>User Name</label>
          <Input
            onchange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setRegisterUsername(event.target.value)
            }
          />
          <label>Email</label>
          <Input
            onchange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setRegisterEmail(event.target.value)
            }
          />
          <label>Password</label>
          <Input
            inputType="password"
            onchange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setRegisterPassword(event.target.value)
            }
          />
          <p>
            Already have an account?
            <button onClick={() => setFormToShow("login")}>Login</button>
          </p>
          <Button onclick={register} label="register"></Button>
        </form>
      ) : (
        <form className={styles.authForm}>
          <h2>Login</h2>
          <label>Email</label>
          <Input
            onchange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setLoginEmail(event.target.value)
            }
          />
          <label>Password</label>
          <Input
            inputType="password"
            onchange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setLoginPassword(event.target.value)
            }
          />
          <p>
            Don't have an account yet?
            <button onClick={() => setFormToShow("register")}>Register</button>
          </p>
          <Button onclick={login} label="login"></Button>
        </form>
      )}
      <Button onclick={getLoggedinUser} label="get user info"></Button>
      <Button onclick={logout} label="logout"></Button>
      <Link href="/">Home</Link>
    </>
  );
};

export default AuthForm;
