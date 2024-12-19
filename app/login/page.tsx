"use client";
import AuthForm from "../components/Organisms/Auth/Auth";
import { useRouter } from "next/navigation";
import { useUser } from "./../contextApi/UserProvider";
import { useEffect } from "react";

const Login = () => {
  const router = useRouter();
  const { user, setUser } = useUser();

  useEffect(() => {
    if (user) {
      router.push("/allrecipes");
    }
  }, [user]);
  return (
    <>
      <AuthForm />
    </>
  );
};

export default Login;
