import axios from "axios";

export const getUsers = async () => {
  try {
    const { data, status } = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    return data;
  } catch (error) {
    console.log(`There was an error getting users: ${error}`);
  }
};

export const getUserRecipes = async (id: string) => {
  try {
    const { data, status } = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${id}/recipes`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    return data;
  } catch (error) {
    console.log(`There was an error getting users recipes: ${error}`);
  }
};

export const getUserFavoriteRecipes = async (id: string) => {
  try {
    const { data, status } = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${id}/favoriteRecipes`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    return data;
  } catch (error) {
    console.log(`There was an error getting users favorite recipes: ${error}`);
  }
};
