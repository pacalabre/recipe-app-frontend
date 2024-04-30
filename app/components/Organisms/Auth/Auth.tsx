"use client";
import { useState } from "react";
import Input from "../../Atoms/Input/Input";
import "./Auth.css";
import axios from "axios";
import Link from "next/link";

const AuthForm = () => {
  const [registerName, setRegisterName] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

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
    <div className="App">
      Í
      <form className="register-form">
        <h2>Register</h2>
        <label>Name:</label>
        <Input onchange={(event: any) => setRegisterName(event.target.value)} />
        <label>User Name</label>
        <Input
          onchange={(event: any) => setRegisterUsername(event.target.value)}
        />
        <label>Email</label>
        <Input
          onchange={(event: any) => setRegisterEmail(event.target.value)}
        />
        <label>Password</label>
        <Input
          type="password"
          onchange={(event: any) => setRegisterPassword(event.target.value)}
        />
        <button onClick={register}>Submit</button>
      </form>
      <form className="register-form">
        <h2>Login</h2>
        <label>Email</label>
        <Input onchange={(event: any) => setLoginEmail(event.target.value)} />
        <label>Password</label>
        <Input
          type="password"
          onchange={(event: any) => setLoginPassword(event.target.value)}
        />
        <button onClick={login}>Submit</button>ß
      </form>
      <button onClick={getLoggedinUserInfo}>Get User Info</button>
      <button onClick={logoutUser}>Logout</button>
      <Link href="/">Home</Link>
    </div>
  );
};

export default AuthForm;
