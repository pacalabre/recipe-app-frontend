"use client";
import { useEffect, useState } from "react";
import { getRecipe } from "../services/recipe-service";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Recipe } from "../types/recipeTypes";

const RecipePage = () => {
  const searchParams = useSearchParams();
  const recipeId = searchParams.get("id");
  const [recipe, setRecipe] = useState<Recipe>();

  const callGetRecipe = async () => {
    if (recipeId) {
      const response = await getRecipe(recipeId);
      setRecipe(response);
    }
  };

  useEffect(() => {
    callGetRecipe();
  }, []);
  return (
    <>
      <Link href="/allrecipes">All Recipes</Link>
      <h2>{recipe?.recipeName}</h2>
      <p>
        {recipe?.subtitle} by {recipe?.author.name}
      </p>
      <p>Recipe difficulty: {recipe?.recipeDifficulty}</p>
      <p>Cooking Time: {recipe?.totalMakeTime}</p>
      <p>Ingredients: {recipe?.ingredients}</p>
      <p>Instructions: {recipe?.recipeInstructions}</p>
    </>
  );
};

export default RecipePage;
