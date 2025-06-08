"use client";
import { useState } from "react";
import { useUser } from "../../../contextApi/UserProvider";
import Input from "../../Molecules/Input/Input";
import Button from "../../Atoms/Button/Button";
import styles from "./Auth.module.css";
import SkilletLogo from "../../Atoms/SkilletLogo/SkilletLogo";
import { useForm, SubmitHandler } from "react-hook-form";
import { RegisterFormInputs } from "@/app/types/registerFormInputTypes";
import { registerUser, loginUser } from "@/app/services/auth-service";
import { useRouter } from "next/navigation";
import { Snackbar, SnackbarCloseReason } from "@mui/material";
import Link from "next/link";

const AuthForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

  const router = useRouter();
  const { user, setUser } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);
  const [messageToUser, setMessageToUser] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [formToShow, setFormToShow] = useState("register");
  const password = watch("registerPassword");

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    if (formToShow === "register") {
      try {
        const response = await registerUser(
          data.registerName,
          data.registerEmail,
          data.registerPassword,
          isAdmin
        );
        if (response?.status === 200) {
          reset();
          setFormToShow("login");
          setMessageToUser("User Created. You can now login");
          setOpenSnackbar(true);
        }
      } catch (error) {
        console.log(`There was an error registering this user: ${error}`);
      }
    }
    if (formToShow === "login") {
      try {
        const response = await loginUser(data.loginEmail, data.loginPassword);
        if (response?.status === 200 && !response.data.user.id) {
          setMessageToUser("Email or password is incorrect");
          setOpenSnackbar(true);
        }
        if (response?.status === 200 && response.data.user.id) {
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
        <SkilletLogo />
        {formToShow === "register" ? (
          <>
            <Input
              register={register}
              label="name"
              inputType="text"
              formField="registerName"
              rules={{
                required: "Name is required",
                minLength: {
                  value: 1,
                  message: "Username must be at least 1 characters long",
                },
                maxLength: {
                  value: 80,
                  message: "Username can not be longer than 80 characters long",
                },
              }}
              errorMsg={errors.registerName?.message}
            />
            <Input
              label="email"
              register={register}
              inputType="text"
              formField="registerEmail"
              rules={{
                required: "email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message:
                    "Email must be in email address format with at least 2 characters in the domain name",
                },
              }}
              errorMsg={errors.registerEmail?.message}
            />
            <Input
              label="password"
              register={register}
              inputType="password"
              formField="registerPassword"
              rules={{
                required: "Password is required",
                validate: (value: string) =>
                  !value.toLowerCase().includes("password") ||
                  "Password cannot contain the word 'password'",
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "Password must have at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character",
                },
              }}
              errorMsg={errors.registerPassword?.message}
            />
            <Input
              label="confirm password"
              register={register}
              inputType="password"
              formField="confirmPassword"
              rules={{
                required: "Confirm Password is required",
                validate: (value: string) =>
                  value === password || "Passwords do not match",
              }}
              errorMsg={errors.confirmPassword?.message}
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
              rules={{ required: "Password is required" }}
              errorMsg={errors.loginPassword?.message}
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
      <Snackbar
        open={openSnackbar}
        onClose={handleClose}
        autoHideDuration={3000}
        message={messageToUser}
      />
      <Link className={styles.seeAllRecipesLink} href={"/allrecipes"}>
        See recipe list without being able to contribute
      </Link>
    </div>
  );
};

export default AuthForm;
