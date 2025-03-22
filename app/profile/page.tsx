"use client";

import { useEffect, useState } from "react";
import { useUser } from "../contextApi/UserProvider";
import { getUserRecipes } from "../services/user-service";
import styles from "./profile.module.css";
import { Recipe } from "../types/recipeTypes";
import Link from "next/link";
const Profile = () => {
  const { user } = useUser();
  const [userRecipes, setUserRecipes] = useState<any>();
  const [initials, setInitials] = useState<string>("");

  const callGetUserRecipes = async (id: string) => {
    if (id) {
      const response = await getUserRecipes(id);
      setUserRecipes(response);
    }
    console.log("recipes", userRecipes);
  };

  useEffect(() => {
    if (user) {
      callGetUserRecipes(user.id);
      setInitials(user.name.charAt(0));
    }
  }, [user]);

  return (
    <main className={styles.profileCard}>
      <section className={styles.userDetails}>
        <div className={styles.userInitalContainer}>
          <p className="userInital">{initials}</p>
        </div>
        <div className={styles.userNameEmail}>
          <p>
            Name:<span className={styles.userName}>{user?.name}</span>
          </p>
          <p>Email:{user?.email}</p>
        </div>
      </section>
      <section>
        <h3>Your Recipes:</h3>
        {userRecipes?.length ? (
          userRecipes?.map((recipe: Recipe, index: number) => (
            <Link
              className={styles.recipe}
              href={{
                pathname: "/recipe",
                query: { id: recipe._id },
              }}
            >
              <div
                style={{ backgroundImage: `url(${recipe?.image})` }}
                className={styles.recipeImage}
              ></div>
              <div className={styles.recipeDetails}>
                <div className={styles.recipeTitleSubtitle}>
                  <h4 className={styles.recipeTitle}>{recipe.recipeName}</h4>
                  <p className={styles.recipeSubtitle}>{recipe.subtitle}</p>
                </div>
                <div className={styles.difficultyTotalMakeTime}></div>
              </div>
            </Link>
          ))
        ) : (
          <p>nothing to show</p>
        )}
      </section>
    </main>
  );
};

export default Profile;
