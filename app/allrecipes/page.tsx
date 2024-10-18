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
      <Link href="/newrecipe">New Recipe</Link>
      <h2>All Recipes</h2>
      {recipes.length > 0 ? (
        recipes?.map((recipe: any, index: string) => (
          <div>
            <Link
              href={{
                pathname: "/recipe",
                query: { id: recipe._id },
              }}
              key={index}
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
