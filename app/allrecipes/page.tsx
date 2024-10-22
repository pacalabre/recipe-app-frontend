"use client";
import { useEffect, useState } from "react";
import { getAllRecipes, updateRecipe } from "../services/recipe-service";
import { useUser } from "../contextApi/UserProvider";
import Link from "next/link";
import { Recipe } from "../types/recipeTypes";
import Button from "../components/Atoms/Button/Button";

const Receipes = () => {
  const { user } = useUser();
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

  return (
    <>
      <Link href="/login">Home</Link>
      <Link href="/newrecipe">New Recipe</Link>
      <Link href="/profile">Profile</Link>
      <h2>All Recipes</h2>
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
              label="Add Favorite"
              onclick={() => addFavorite(recipe, user.id)}
            ></Button>
          </div>
        ))
      ) : (
        <p>nothing to show</p>
      )}
    </>
  );
};

export default Receipes;
