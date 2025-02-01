"use client";
import { useEffect, useState } from "react";
import { getAllRecipes, updateRecipe } from "../services/recipe-service";
import { useUser } from "../contextApi/UserProvider";
import Link from "next/link";
import { Recipe } from "../types/recipeTypes";
import Button from "../components/Atoms/Button/Button";
import { getLoggedinUserInfo, logoutUser } from "../services/auth-service";
import { useRouter } from "next/navigation";

const Receipes = () => {
  const router = useRouter();
  const { user, setUser } = useUser();
  const [recipes, setRecipes] = useState<Recipe[] | []>([]);

  const getRecipeList = async () => {
    const response = await getAllRecipes();
    setRecipes(response);
  };

  useEffect(() => {
    getRecipeList();
  }, []);

  const addFavorite = async (recipe: Recipe, userId: string) => {
    let updatedRecipe = recipe;
    if (!userId) return;
    if (updatedRecipe?.favorites?.includes(userId)) {
      const indexOfFavorite = updatedRecipe.favorites.indexOf(userId);
      updatedRecipe.favorites.splice(indexOfFavorite, 1);
    } else {
      updatedRecipe.favorites?.push(userId);
    }
    const response = await updateRecipe(updatedRecipe);
    if (response?.status === 200) getRecipeList();
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

  const logout = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    try {
      const response = await logoutUser();
      if (response) {
        setUser(null);
        router.push("/login");
      }
    } catch (error) {
      console.log(`There was an error when logging out the user: ${error}`);
    }
  };

  return (
    <>
      {/* <Button varient="primary" onclick={logout} label="logout"></Button>
      <Button
        varient="secondary"
        onclick={getLoggedinUser}
        label="get user info"
      ></Button> */}

      <div className="container">
        {recipes.length > 0 ? (
          recipes.map((recipe: Recipe, index: number) => (
            <div key={index}>
              <Link
                href={{
                  pathname: "/recipe",
                  query: { id: recipe._id },
                }}
              >
                {recipe.recipeName}
              </Link>
              <Button
                varient="secondary"
                label="Add Favorite"
                onclick={() => addFavorite(recipe, user.id)}
              ></Button>
            </div>
          ))
        ) : (
          <p>nothing to show</p>
        )}
      </div>
    </>
  );
};

export default Receipes;
