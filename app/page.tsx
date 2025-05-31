"use client";
import AuthForm from "./components/Organisms/Auth/Auth";
import { useRouter } from "next/navigation";
import { useUser } from "./contextApi/UserProvider";
import { useEffect, useState } from "react";
import Loader from "./components/Atoms/Loader/Loader";

export default function Home() {
  const router = useRouter();
  const { user, setUser } = useUser();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      router.push("/allrecipes");
      return;
    } else {
      setIsLoading(false);
    }
  }, [user]);

  return <>{isLoading ? <Loader /> : <AuthForm />}</>;
}
