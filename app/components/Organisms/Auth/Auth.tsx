"use client";
import { useState } from "react";
import { useUser } from "../../../contextApi/UserProvider";
import Input from "../../Atoms/Input/Input";
import Button from "../../Atoms/Button/Button";
import styles from "./Auth.module.css";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { RegisterFormInputs } from "@/app/types/registerFormInputTypes";
import {
  registerUser,
  loginUser,
  getLoggedinUserInfo,
  logoutUser,
} from "@/app/services/auth-service";
import { useRouter } from "next/navigation";

const AuthForm = () => {
  const router = useRouter();
  const { user, setUser } = useUser();

  const [formToShow, setFormToShow] = useState("register");
  const [loggedinUser, setLoggedinUser] = useState(null);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
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
        if (response?.status === 200) {
          setUser(response.data.user);
          router.push("/allrecipes");
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
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        {formToShow === "register" ? (
          <>
            <Input
              register={register}
              label="name"
              inputType="text"
              formField="registerName"
              rules={{ required: "Name is required" }}
              errorMsg={errors.registerName?.message}
            />
            <Input
              label="user name"
              register={register}
              inputType="text"
              formField="registerUsername"
            />
            <Input
              label="email"
              register={register}
              inputType="text"
              formField="registerEmail"
            />
            <Input
              label="password"
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
            <Input
              label="email"
              register={register}
              inputType="text"
              formField="loginEmail"
              rules={{ required: "Email is required" }}
              errorMsg={errors.loginEmail?.message}
            />
            <Input
              label="password"
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
