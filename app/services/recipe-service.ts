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
