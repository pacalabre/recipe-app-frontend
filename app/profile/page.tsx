"use client";

import { useEffect, useState } from "react";
import { useUser } from "../contextApi/UserProvider";
import {
  getUserRecipes,
  getUserFavoriteRecipes,
} from "../services/user-service";
import { deleteRecipe } from "../services/recipe-service";
import styles from "./profile.module.css";
import { Recipe } from "../types/recipeTypes";
import Link from "next/link";
import Loader from "../components/Atoms/Loader/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "../components/Atoms/Button/Button";

const Profile = () => {
  const { user } = useUser();
  const [userRecipes, setUserRecipes] = useState<any>();
  const [userFavoriteRecipes, setUserFavoriteRecipes] = useState<any>();
  const [initials, setInitials] = useState<string>("");
  const [isAdminDashShowing, setIsAdminDashShowing] = useState(false);

  const callGetUserRecipes = async (id: string) => {
    if (id) {
      const response = await getUserRecipes(id);
      setUserRecipes(response);
    }
  };

  const callGetUserFavoriteRecipes = async (id: string) => {
    if (id) {
      const response = await getUserFavoriteRecipes(id);
      setUserFavoriteRecipes(response);
    }
    console.log("favorite recipes", userFavoriteRecipes);
  };

  useEffect(() => {
    if (user) {
      callGetUserRecipes(user.id);
      callGetUserFavoriteRecipes(user.id);
      setInitials(user.name.charAt(0));
    }
  }, [user]);

  return (
    <>
      {user ? (
        <main className={styles.profileCard}>
          <div className={styles.profileContentContainer}>
            <section className={styles.userDetails}>
              <div className={styles.userInitalContainer}>
                <p className="userInital">{initials}</p>
              </div>
              <div className={styles.userNameEmail}>
                <p>
                  Name:<span className={styles.userName}>{user?.name}</span>
                </p>
                <p>Email:{user?.email}</p>
                {user?.isAdmin && (
                  <p>
                    You are an Admin{" "}
                    <Button
                      label="View Admin Dash"
                      varient="tertiary"
                      onclick={() => setIsAdminDashShowing(!isAdminDashShowing)}
                    ></Button>
                  </p>
                )}
              </div>
            </section>{" "}
            {isAdminDashShowing ? (
              <h3>Admin Dash</h3>
            ) : (
              <div className={styles.profileRecipesContainer}>
                <section>
                  <h3>Your Recipes:</h3>
                  {userRecipes?.length
                    ? userRecipes?.map((recipe: Recipe, index: number) => (
                        <div className={styles.userRecipe}>
                          <Link
                            className={styles.recipeLink}
                            href={{
                              pathname: "/recipe",
                              query: { id: recipe._id },
                            }}
                          >
                            <div
                              style={{
                                backgroundImage: `url(${recipe?.image})`,
                              }}
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
                              <div
                                className={styles.difficultyTotalMakeTime}
                              ></div>
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
                    : null}
                </section>
                <section>
                  <h3>Your Favorite Recipes:</h3>
                  {userFavoriteRecipes?.length
                    ? userFavoriteRecipes?.map(
                        (recipe: Recipe, index: number) => (
                          <div className={styles.userRecipe}>
                            <Link
                              className={styles.recipeLink}
                              href={{
                                pathname: "/recipe",
                                query: { id: recipe._id },
                              }}
                            >
                              <div
                                style={{
                                  backgroundImage: `url(${recipe?.image})`,
                                }}
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
                                <div
                                  className={styles.difficultyTotalMakeTime}
                                ></div>
                              </div>
                            </Link>
                          </div>
                        )
                      )
                    : null}
                </section>
              </div>
            )}
          </div>
        </main>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Profile;
