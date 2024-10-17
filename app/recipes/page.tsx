"use client";
import { useEffect, useState } from "react";
import { useUser } from "../contextApi/UserProvider";
import { getAllRecipes } from "../services/recipe-service";
import Link from "next/link";

const Receipes = () => {
  const { user } = useUser();
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
      <Link href="/login">Home</Link>

      <h2>All Recipes</h2>
      <span>
        Loggedin User: {user ? user.name : "No user currently logged in"}
      </span>
      {recipes.length > 0 ? (
        recipes?.map((recipe: any, index: string) => (
          <div key={index}>{recipe.recipeName}</div>
        ))
      ) : (
        <p>nothing to show</p>
      )}
    </>
  );
};

export default Receipes;
