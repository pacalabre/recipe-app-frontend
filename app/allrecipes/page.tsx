"use client";
import { useEffect, useState } from "react";
import { getAllRecipes } from "../services/recipe-service";
import Link from "next/link";
import { Recipe } from "../types/recipeTypes";

const Receipes = () => {
  const [recipes, setRecipes] = useState<Recipe[] | []>([]);

  const getRecipeList = async () => {
    const response = await getAllRecipes();
    setRecipes(response);
  };

  useEffect(() => {
    getRecipeList();
  }, []);

  return (
    <>
      <Link href="/login">Home</Link>
      <Link href="/newrecipe">New Recipe</Link>
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
          </div>
        ))
      ) : (
        <p>nothing to show</p>
      )}
    </>
  );
};

export default Receipes;
