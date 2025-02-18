"use client";
import { useEffect, useState } from "react";
import RecipeGallery from "../components/Organisms/RecipeGallery/RecipeGallery";
import { getAllRecipes, updateRecipe } from "../services/recipe-service";
import { useUser } from "../contextApi/UserProvider";
import { Recipe } from "../types/recipeTypes";
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
      <main className="container">
        {recipes.length > 0 ? (
          <RecipeGallery recipes={recipes} />
        ) : (
          <p>nothing to show</p>
        )}
      </main>
    </>
  );
};

export default Receipes;
