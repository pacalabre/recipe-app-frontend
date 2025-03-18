"use client";

import { useEffect, useState } from "react";
import { useUser } from "../contextApi/UserProvider";
import { getUserRecipes } from "../services/user-service";
import Link from "next/link";
import { Recipe } from "../types/recipeTypes";
const Profile = () => {
  const { user } = useUser();
  const [userRecipes, setUserRecipes] = useState<any>();

  const callGetUserRecipes = async (id: string) => {
    if (id) {
      const response = await getUserRecipes(id);
      setUserRecipes(response);
    }
  };

  useEffect(() => {
    if (user) {
      callGetUserRecipes(user.id);
    }
  }, []);

  return (
    <>
      <h2>Profile</h2>
      <p>Username: {user?.userName}</p>
      <p>Email: {user?.email}</p>
      <p>Member since: {user?.dateCreated}</p>
      <p>Tags Used:</p>
      Your Recipes:
      {userRecipes?.length ? (
        userRecipes?.map((recipe: Recipe, index: number) => (
          <p>{recipe.recipeName}</p>
        ))
      ) : (
        <p>nothing to show</p>
      )}
    </>
  );
};

export default Profile;
