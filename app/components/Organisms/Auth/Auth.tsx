"use client";
import { useState } from "react";
import { useUser } from "../../../contextApi/UserProvider";
import Input from "../../Molecules/Input/Input";
import Button from "../../Atoms/Button/Button";
import styles from "./Auth.module.css";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { RegisterFormInputs } from "@/app/types/registerFormInputTypes";
import { registerUser, loginUser } from "@/app/services/auth-service";
import { useRouter } from "next/navigation";

const AuthForm = () => {
  const router = useRouter();
  const { user, setUser } = useUser();

  const [formToShow, setFormToShow] = useState("register");
  const {
    register,
    handleSubmit,
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

  return (
    <div className={styles.authFormContainer}>
      <form className={styles.authForm} onSubmit={handleSubmit(onSubmit)}>
        <Image
          className={styles.logo}
          src="logo-skillet.svg"
          alt="Caladine Logo"
          width={0}
          height={0}
          sizes="100vw"
        />
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
            <div className={styles.loginRegisterBtnContainer}>
              <div className={styles.loginRegisterToggleBtnContainer}>
                <p>Already have an account?</p>
                <Button
                  varient="tertiary"
                  label="login"
                  onclick={() => {
                    reset();
                    setFormToShow("login");
                  }}
                ></Button>
              </div>
              <Button varient="primary" type="submit" label="register"></Button>
            </div>
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
            <div className={styles.loginRegisterBtnContainer}>
              <div className={styles.loginRegisterToggleBtnContainer}>
                <p>Don't have an account yet?</p>
                <Button
                  varient="tertiary"
                  label="register"
                  onclick={() => {
                    reset();
                    setFormToShow("register");
                  }}
                ></Button>
              </div>
              <Button varient="primary" type="submit" label="login"></Button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default AuthForm;
