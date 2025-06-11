import axios from "axios";
import { Recipe } from "../types/recipeTypes";

export const getAllRecipes = async () => {
  try {
    const { data, status } = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/recipes`,
      {
        headers: {
          Accept: "application/json",
        },
        withCredentials: true,
      }
    );
    return data;
  } catch (error) {
    console.log(`There was an error ${error}`);
  }
};

export const getRecipe = async (id: string) => {
  try {
    const { data, status } = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/recipes/${id}`,
      {
        headers: {
          Accept: "application/json",
        },
        withCredentials: true,
      }
    );
    return data;
  } catch (error) {
    console.log(`There was an error ${error}`);
    return error;
  }
};

export const addNewRecipe = async (
  image: string,
  recipeName: string,
  authorId: string,
  recipeDifficulty: string,
  totalMakeTime: string,
  ingredients: string,
  description: string,
  recipeInstructions: string,
  tags: string[]
) => {
  try {
    const { data, status } = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/recipes`,
      {
        image: image,
        recipeName: recipeName,
        author: {
          _id: authorId,
        },
        recipeDifficulty: recipeDifficulty,
        totalMakeTime: totalMakeTime,
        ingredients: ingredients,
        description: description,
        recipeInstructions: recipeInstructions,
        tags: tags,
      },
      {
        headers: {
          Accept: "application/json",
        },
        withCredentials: true,
      }
    );
    return data;
  } catch (error) {
    console.log(`There was an error ${error}`);
  }
};

export const updateRecipe = async (recipe: Recipe) => {
  try {
    const { data, status } = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/recipes/${recipe._id}`,
      {
        recipeName: recipe.recipeName,
        image: recipe.image,
        author: {
          _id: recipe.author._id,
        },
        recipeDifficulty: recipe.recipeDifficulty,
        totalMakeTime: recipe.totalMakeTime,
        ingredients: recipe.ingredients,
        description: recipe.description,
        recipeInstructions: recipe.recipeInstructions,
        favorites: recipe.favorites,
        tags: recipe.tags,
      },
      {
        headers: {
          Accept: "application/json",
        },
        withCredentials: true,
      }
    );
    return { data, status };
  } catch (error) {
    console.log(`There was an error ${error}`);
  }
};

export const deleteRecipe = async (recipe: Recipe) => {
  try {
    const { data, status } = await axios.delete(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/recipes/${recipe._id}`,

      { withCredentials: true }
    );
    return { data, status };
  } catch (error) {
    console.log(`There was an error ${error}`);
  }
};
