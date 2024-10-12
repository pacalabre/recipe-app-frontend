"use client";
import { useState } from "react";
import Input from "../../Atoms/Input/Input";
import Button from "../../Atoms/Button/Button";
import styles from "./Auth.module.css";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  registerUser,
  loginUser,
  getLoggedinUserInfo,
  logoutUser,
} from "@/app/services/auth-service";
import { useRouter } from 'next/navigation'


type Inputs = {
  registerName: string;
  registerUsername: string;
  registerEmail: string;
  registerPassword: string;
  loginEmail: string;
  loginPassword: string;
};

const AuthForm = () => {
  const router = useRouter()

  const [formToShow, setFormToShow] = useState("register");
  const [loggedinUser, setLoggedinUser] = useState(null);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log("data", data);
    if (formToShow === "register") {
      try {
        const response = await registerUser(
          data.registerName,
          data.registerUsername,
          data.registerEmail,
          data.registerPassword
        );
      } catch (error) {
        console.log(`There was an error registering this user: ${error}`);
      }
    }
    if (formToShow === "login") {
      try {
        const response = await loginUser(data.loginEmail, data.loginPassword);
        if(response?.status === 200) {
          router.push("/recipes")
        }
      } catch (error) {
        console.log(`There was an error while logging in the user: ${error}`);
      } 
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
      <form className={styles.authForm} onSubmit={handleSubmit(onSubmit)}>
        {formToShow === "register" ? (
          <>
            <h2>Register</h2>
            <label>Name:</label>
            <Input
              register={register}
              inputType="text"
              formField="registerName"
              rules={{ required: "Name is required" }}
            />
            {errors.registerName && <p>{errors.registerName.message}</p>}
            <label>User Name</label>
            <Input
              register={register}
              inputType="text"
              formField="registerUsername"
            />
            <label>Email</label>
            <Input
              register={register}
              inputType="text"
              formField="registerEmail"
            />
            <label>Password</label>
            <Input
              register={register}
              inputType="password"
              formField="registerPassword"
            />
            <p>
              Already have an account?
              <button
                onClick={() => {
                  reset();
                  setFormToShow("login");
                }}
              >
                Login
              </button>
            </p>
            <button type="submit">Register</button>
          </>
        ) : (
          <>
            <h2>Login</h2>
            <label>Email</label>
            <Input
              register={register}
              inputType="text"
              formField="loginEmail"
              rules={{ required: "Email is required" }}
            />
            {errors.loginEmail && <p>{errors.loginEmail.message}</p>}
            <label>Password</label>
            <Input
              register={register}
              inputType="password"
              formField="loginPassword"
            />
            <p>
              Don't have an account yet?
              <button
                onClick={() => {
                  reset();
                  setFormToShow("register");
                }}
              >
                Register
              </button>
            </p>
            <button type="submit">Login</button>
          </>
        )}
      </form>
      <Button onclick={getLoggedinUser} label="get user info"></Button>
      <Button onclick={logout} label="logout"></Button>
      <Link href="/">Home</Link>
    </>
  );
};

export default AuthForm;
