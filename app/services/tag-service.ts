import axios from "axios";

export const getAllTags = async () => {
  try {
    const { data, status } = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tags`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    return data;
  } catch (error) {
    console.log(`There was an error getting tags: ${error}`);
  }
};

export const addTag = async (tagName: string) => {
  try {
    const { data, status } = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tags`,
      { tagName: tagName },
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    return { data, status };
  } catch (error) {
    console.log(`There was an error creating a tag: ${error}`);
  }
};
//Not sure if this is here on accident, commenting out for now.
// export const getUsers = async () => {
//   try {
//     const { data, status } = await axios.get(
//       `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users`,
//       {
//         headers: {
//           Accept: "application/json",
//         },
//       }
//     );
//     return data;
//   } catch (error) {
//     console.log(`There was an error getting users: ${error}`);
//   }
// };
