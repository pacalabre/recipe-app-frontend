"use client";
import { useState } from "react";
import Input from "../../Atoms/Input/Input";
import Button from "../../Atoms/Button/Button";
import styles from "./Auth.module.css";
import axios from "axios";
import Link from "next/link";

const AuthForm = () => {
  const [registerName, setRegisterName] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [formToShow, setFormToShow] = useState("login");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [loggedinUser, setLoggedinUser] = useState(null);

  const register = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    axios({
      method: "POST",
      data: {
        name: registerName,
        userName: registerUsername,
        email: registerEmail,
        password: registerPassword,
      },
      withCredentials: true,
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register`,
    }).then((res) => console.log(res));
  };

  const login = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    axios({
      method: "POST",
      data: {
        email: loginEmail,
        password: loginPassword,
      },
      withCredentials: true,
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`,
    }).then((res) => console.log(res));
  };

  const getLoggedinUserInfo = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    axios({
      method: "GET",
      withCredentials: true,
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/user`,
    }).then((res) => {
      setLoggedinUser(res.data);
      console.log(res.data);
    });
  };

  const logoutUser = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    axios({
      method: "POST",
      withCredentials: true,
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/logout`,
    }).then((res) => console.log(res));
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
      <Button onclick={getLoggedinUserInfo} label="get user info"></Button>
      <Button onclick={logoutUser} label="logout"></Button>
      <Link href="/">Home</Link>
    </>
  );
};

export default AuthForm;
