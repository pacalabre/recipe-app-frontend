"use client";

import { useEffect, useState } from "react";
import { useUser } from "../contextApi/UserProvider";
import { getUserRecipes } from "../services/user-service";
import { deleteRecipe } from "../services/recipe-service";
import styles from "./profile.module.css";
import { Recipe } from "../types/recipeTypes";
import Link from "next/link";
import Loader from "../components/Atoms/Loader/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

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
    <>
      {user ? (
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
                <div className={styles.userRecipe}>
                  <Link
                    className={styles.recipeLink}
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
                        <h4 className={styles.recipeTitle}>
                          {recipe.recipeName}
                        </h4>
                        <p className={styles.recipeSubtitle}>
                          {recipe.subtitle}
                        </p>
                      </div>
                      <div className={styles.difficultyTotalMakeTime}></div>
                    </div>
                  </Link>
                  <button
                    className={styles.deleteRecipeButton}
                    onClick={async () => {
                      try {
                        const response = await deleteRecipe(recipe);
                        if (response?.status === 200) {
                          const recipes = await getUserRecipes(user.id);
                          if (recipes) setUserRecipes(recipes);
                        }
                      } catch (error) {
                        console.log(`There was an error: ${error}`);
                      }
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                  </button>
                </div>
              ))
            ) : (
              <p>nothing to show</p>
            )}
          </section>
        </main>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Profile;
