"use client";
import { useEffect, useState } from "react";
import RecipeGallery from "../components/Organisms/RecipeGallery/RecipeGallery";
import { getAllRecipes } from "../services/recipe-service";
import { useUser } from "../contextApi/UserProvider";
import { Recipe } from "../types/recipeTypes";

import { useRouter } from "next/navigation";
import Loader from "../components/Atoms/Loader/Loader";

const Receipes = () => {
  const router = useRouter();
  const { user, setUser } = useUser();
  const [recipes, setRecipes] = useState<Recipe[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getRecipeList = async () => {
    const response = await getAllRecipes();
    setRecipes(response);
    if (response) setIsLoading(false);
  };

  useEffect(() => {
    getRecipeList();
  }, []);

  return (
    <>
      <main className="container">
        {isLoading ? <Loader /> : <RecipeGallery recipes={recipes} />}
      </main>
    </>
  );
};

export default Receipes;
