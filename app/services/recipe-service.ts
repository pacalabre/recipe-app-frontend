import axios from "axios";

export const getAllRecipes = async () => {
  try {
    const { data, status } = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/recipes`,
      {
        headers: {
          Accept: "application/json",
        },
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
      }
    );
    return data;
  } catch (error) {
    console.log(`There was an error ${error}`);
  }
};

export const addNewRecipe = async (
  recipeName: string,
  subtitle: string,
  authorId: string,
  recipeDifficulty: string,
  totalMakeTime: string,
  ingredients: string,
  description: string,
  recipeInstructions: string
) => {
  try {
    const { data, status } = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/recipes`,
      {
        recipeName: recipeName,
        subtitle: subtitle,
        author: {
          _id: authorId,
        },
        recipeDifficulty: recipeDifficulty,
        totalMakeTime: totalMakeTime,
        ingredients: ingredients,
        description: description,
        recipeInstructions: recipeInstructions,
      },
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    return data;
  } catch (error) {
    console.log(`There was an error ${error}`);
  }
};
