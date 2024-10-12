"use client";
import { useEffect, useState } from "react";
import { getAllRecipes } from "../services/recipe-service";

const Receipes = () => {
  const [recipes, setRecipes] = useState<any>([]);

  const getRecipeList = async () => {
    const response = await getAllRecipes();
    setRecipes(response);
  };

  useEffect(() => {
    getRecipeList();
  }, []);

  return (
    <>
      <h2>All Recipes</h2>
      {recipes.length > 0 ? (
        recipes?.map((recipe: any, index: string) => (
          <div key={index}>{recipe.title}</div>
        ))
      ) : (
        <p>nothing to show</p>
      )}
    </>
  );
};

export default Receipes;
