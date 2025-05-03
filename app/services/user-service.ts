import axios from "axios";
import { User } from "../types/userTypes";

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

export const editUsers = async (user: User) => {
  try {
    const { data, status } = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${user._id}`,
      {
        isAdmin: user.isAdmin,
      },
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    return data;
  } catch (error) {
    console.log(`There was an error updating the user: ${error}`);
  }
};
